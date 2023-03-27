const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({ id }, "superSecretKey", {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {

    let errors = { name: "", email: "", phone: "", password: "" }

    if (err.code === 11000) {

        const keys = Object.keys(err.keyValue)

        if (keys.includes('email')) {
            errors.email = "This email is already used!"
        } else if (keys.includes('phone')) {
            errors.phone = 'This phone number is already used!'
        }

        return errors
    }

    if (err.message.includes('Incorrect email')) {
        errors.email = "Incorrect email"
    } else if (err.message.includes('Incorrect password')) {
        errors.password = "Incorrect password"
    }

    return errors


}

module.exports.register = async (req, res, next) => {
    try {

        const { name, email, phone, password } = req.body
        const user = userModel.create({ name, email, phone, password })

        const token = createToken((await user)._id)

        res.cookie('newCookie', token, {
            withCredentials: true,
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: 'none', secure: true
        })
        res.json({ user: (await user)._id, created: true })

    } catch (err) {
        const errors = handleErrors(err)

        console.log(errors);

        res.json({ errors, created: false, status: 409 })
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = userModel.login(email, password)

        const token = createToken((await user)._id)

        // res.cookie('jwt', token, {
        //     withCredentials: true,
        //     httpOnly: true,
        //     maxAge: maxAge * 1000,
        //     sameSite: 'none', secure: true
        // })
        res.status(200).json(
            {
                user: (await user)._id,
                created: true,
                token: "jwt" + token
            })

    } catch (err) {
        const errors = handleErrors(err)

        console.log(errors);

        res.json({ errors, created: false, status: 409 })
    }
};

