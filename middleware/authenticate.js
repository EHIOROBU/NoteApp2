const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        userId = decoded._id
        next()
    } catch (error) {
        res.send({ message: "please Authenticate" })
    }
}
module.exports = authenticate;