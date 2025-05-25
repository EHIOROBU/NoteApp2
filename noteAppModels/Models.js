const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const { isEmail } = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        unique: [true, "email already existed in database"],
        required: [true, "email is required"],
        validate: [isEmail, "use valid email"]
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
const noteSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    noteId: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    created_at: Date
})
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
userSchema.statics.login = async function ({ email, password }) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error("incorrect email");
    }
    throw new Error("incorrect password");
}
const User = mongoose.model("user", userSchema)
const Note = mongoose.model("note", noteSchema)
module.exports = { User, Note }