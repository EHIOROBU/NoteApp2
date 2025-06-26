const jwt = require("jsonwebtoken")
const { User } = require("../models/User");
const { validateUser, validateLogin } = require("../validator/UserSchema")
const bcrypt = require("bcrypt")

const CreateUser = async (req, res) => {
    try {
        const { error } = validateUser(req.body)
        if (error) return res.status(404).send(error.details[0].message)
        const user = new User(req.body)
        await user.save()
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }
}
const accessUser = async (req, res) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) return res.status(404).send(error.details[0].message)

        const isValidEmail = await User.findOne({ email: req.body.email })
        if (!isValidEmail) return res.status(400).send("incorrect Email address")

        const isValidPassword = await bcrypt.compare(req.body.password, isValidEmail.password)
        if (!isValidPassword) return res.status(400).send("your password is incorrect")

        const token = jwt.sign({ _id: isValidEmail._id }, process.env.JWT_SECRET, { expiresIn: "3h" })
        res.send({ token })
    } catch (err) {
        res.status(404).send(err.message)
    }
}
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({})
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    CreateUser,
    getUser,
    accessUser
};