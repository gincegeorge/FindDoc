const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'That email address is taken.'],
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required'],
        unique: [true, 'same phone'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
})

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function (email, password) {

    const user = await this.findOne({ email })

    if (user) {

        console.log('User found');

        const auth = await bcrypt.compare(password, user.password)

        if (auth) {
            console.log("Login Sucess!!", user);
            return user
        }

        console.log('Incorrect password!');
        throw Error("Incorrect password!")
    }

    console.log('Incorrect email!');
    throw Error("Incorrect email!")
}

module.exports = mongoose.model("Users", userSchema)