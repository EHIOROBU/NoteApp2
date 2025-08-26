const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { validateUser, validateLogin } = require("../validator/UserSchema");
const bcrypt = require("bcrypt");

const CreateUser = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const accessUser = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email or password");

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) return res.status(400).send("Invalid email or password");

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "3h" });
        res.send({ token });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).send("User not found");
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

module.exports = {
    CreateUser,
    getUser,
    accessUser,
    getUserById
};