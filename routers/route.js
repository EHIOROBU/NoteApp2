const express = require("express")
const router = express.Router()

const { getUser, CreateUser, accessUser } = require("../controllers/userController");
const {createNote} = require("../controllers/noteController")
const {createReminder, fetchReminder} = require("../controllers/reminderController")
router.get("/", getUser)
router.post("/register", CreateUser)
router.post("/login", accessUser)
router.post("/signup", createNote)
router.get("/reminder", fetchReminder)
router.post("/reminder", createReminder)


module.exports = router;