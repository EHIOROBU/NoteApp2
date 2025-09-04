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
        return res.status(200).json({
            success: true,
            message: "user successfully created",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                details: error.message,
            }
        });
    }
};

const accessUser = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password",
                error: {
                    code: "PASSWORD_OR_EMAIL_INCORRECT_OR_DOESNOT_EXIST",
                    details: "Invalid Email or Password"
                }
            });

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword)
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password",
                error: {
                    code: "PASSWORD_OR_EMAIL_INCORRECT_OR_DOESNOT_EXIST",
                    details: "Invalid Email or Password"
                }
            });;

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "3h" });
        return res.send({
            success: true,
            message: "Successfully logged in",
            data: {
                token
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                details: error.message,
            }
        });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.find({});
        return res.status(200).json({
            success: true,
            message: "successfully fetched all Users",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                details: error.message,
            }
        });
    }
};
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user)
            return res.status(400).json({
                success: false,
                message: "user not found",
                error: {
                    code: "USER_NOT_FOUND_OR_UNAVAILABLE",
                    details: "user not found"
                }
            });

        return res.status(200).json({
            success: true,
            message: "successfully fetched userById",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                details: error.message,
            }
        });
    }
};

module.exports = {
    CreateUser,
    getUser,
    accessUser,
    getUserById
};