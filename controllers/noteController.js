const Note = require("../models/Note")

const getNote = async (req, res) => {
    try {
        const { title, search, content, tags, page = 1, limit = 5 } = req.query;
        const filter = {}

        if (title) {
            filter.title = {
                $regex: title, $options: "i"
            }
        }
        if (content) {
            filter.content = {
                $regex: content, $options: "i"
            }
        }
        if (tags) {
            filter.tags = {
                $regex: tags, $options: "i"
            }
        }
        if (search) {
            filter.$or = [
                {
                    title: { $regex: search, $options: "i" }
                },
                {
                    content: { $regex: search, $options: "i" }
                },
                {
                    tags: { $regex: search, $options: "i" }
                }
            ]
        }
        const pageNum = parseInt(page) || 1
        const limitNum = parseInt(limit) || 5
        const skip = (pageNum - 1) * limitNum
        console.log(Note)
        const totalNote = await Note.countDocuments(filter)
        console.log(Note)
        const notes = await Note.find({ userId: req.user._id, ...filter }).skip(skip).limit(limitNum)
        console.log(notes)
        res.status(200).json({
            totalNote, notes, totalPage: Math.ceil(totalNote / limitNum),
            currentPage: pageNum
        }
        )
    } catch (error) {
        console.log(error)
        return res.status(404).send(error.message)
    }
}
const createNote = async (req, res) => {
    try {
        const userId = req.user._id;
        const note = new Note({
            userId, title: req.body.title,
            content: req.body.content,
            tags: req.body.tags
        })
        await note.save()
        res.send(note)
    } catch (error) {
        return res.status(404).send(error.message)

    }
}
const updateNote = async (req, res) => {
    try {
        const { id } = req.params
        const userid = req.body._id
        console.log(Note)
        const note = await Note.findByIdAndUpdate(id, req.body._id);
        if (!note) {
            return res.status(404).json({ message: "note note found or you do not have permission to update note" })
        }
        res.send(note)
        const updatingNote = await Note.findById(id)
        res.send(updatingNote)
    } catch (error) {
        return res.status(404).send(error.message)
    }
}
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params
        const note = await Note.findByIdAndDelete(id, req.body)
        res.status(200).json(note)

        if (!note) {
            res.status(404).send("note note found")
        }
        const deleting = await Note.find({})
        res.status(200).json(deleting)

    } catch (error) {
        return res.status(404).send(error.message)
    }
}

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params
        const getId = await Note.findById(id)
        res.status(200).json(getId)
    } catch (error) {
        return res.status(404).send(error.message)
    }
}
module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNote,
    getNoteById,
}