const express  = require("express")
const router = express.Router()

const {getUser, CreateUser, accessUser} = require("../controllers/control");

router.get("/", getUser)
router.post("/register", CreateUser)
router.post("/login", accessUser)


module.exports = router;