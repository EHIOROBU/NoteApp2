const express = require('express')
const authenticate = require("../middleware/authenticate")
const router = express.Router()

const { getUser, CreateUser, accessUser, getUserById } = require("../controllers/userController");
const { createNote, updateNote, deleteNote, getNote, getNoteById } = require("../controllers/noteController")
const { createReminder, fetchReminder } = require("../controllers/reminderController")
const { createNotification } = require("../controllers/notificationController")

// //users route endpoint
router.post("/register", CreateUser)
router.post("/login", accessUser)
router.get("/users", getUser)
router.get("/users/:id", getUserById)

//note route endpoints
router.get("/notes", authenticate, getNote)
router.post("/notes", authenticate, createNote)
router.get("/notes/:id", authenticate, getNoteById)
router.patch("/notes/:id", authenticate, updateNote)
router.delete("/notes/:id", authenticate, deleteNote)

// reminder route endpoints
router.get("/reminders", authenticate, fetchReminder)
router.post("/reminders", authenticate, createReminder)
//notification route endpoint
router.post("/notifcations", authenticate, createNotification)


module.exports = router;