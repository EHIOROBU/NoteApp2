const jwt = require("jsonwebtoken")
const Note = require("../models/Note")

const createNote =  async(req, res)=>{
    try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    userId = decoded._id

    const note = new Note({
        userId, title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
    })
     await note.save()
     res.send(note)
    } catch (error) {
        res.status(404).send(error.message)
    }
}
module.exports = {
    createNote
}