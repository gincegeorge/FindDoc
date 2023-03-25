const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({ id }, "superSecretKey", {
        expiresIn: maxAge
    })
}

// const handleErrors = (err) => {
//     let errors = { name: "", email: "", phone: "", password: "" }

//     if (err.code === 11000) {
//         errors.email = "This email is already used"
//         return errors
//     }

//     if(err.message.includes('Users validation failed')){

//     }
// }

module.exports.register = async (req, res, next) => {
    try {

        const { name, email, phone, password } = req.body
        const user = userModel.create({ name, email, phone, password })

        const token = createToken((await user)._id)

        res.cookie('jwt', token, {
            withCredentials: true,
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        res.json({ user: (await user)._id, created: true })

    } catch (err) {
        console.log(err);
        res.status(404).send('failed')
    }
};

module.exports.login = async (req, res, next) => { };

