const bcrypt = require("bcrypt")
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        unique: [true, "email already existed in database"],
        required: [true, "email is required"],
        validate: [(value) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(value);
        }, "use valid email"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "use minimum of 8 password characters"]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model("user", userSchema)
module.exports = { User }