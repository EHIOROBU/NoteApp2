const jwt = require("jsonwebtoken")
const { User, Note } = require("../NoteAppModels/Models");

const errorHandler = (err) => {
    console.log(err)
    console.log(err.message, err.code)
    let errors = ({ email: "email already in use", password: "" })
    if (err.message === "incorrect email") {
        errors.email = "email not registered"
    }
    if (err.message === "incorrect password") {
        errors.password = "password is not correct"
    }
    if (err.code === 11000) {
        errors.email = "email already existed on database"
        return errors
    }
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}
maxAge = 1 * 24 * 60 * 60
const myToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
};
const CreateUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        const note = await Note.create({ userId: user._id })
        res.status(200).json(user)
    } catch (err) {
        const error = errorHandler(err)
        res.status(404).json(error)
    }
}
const accessUser = async (req, res) => {
    try {
        const user = await User.login(req.body)
        const jwtToken = myToken(user._id)
        res.cookie("jwt", jwtToken, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json(jwtToken)
    } catch (err) {
        const error = errorHandler(err)
        res.status(404).json(error)
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