const { Query } = require("mongoose");
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

        const totalNote = await Note.countDocuments(filter)
        const note = await Note.find(filter).skip(skip).limit(limitNum)
        res.status(200).json({totalNote, note, totalPage: Math.ceil(totalNote / limitNum),
             currentPage: pageNum})
    } catch (error) {
        res.status(404).send(error.message)
    }
}
const createNote = async (req, res) => {
    try {

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
const updateNote = async (req, res,) => {
    try {
        const { id } = req.params
        const note = await Note.findByIdAndUpdate(id, req.body)
        res.status(200).json(note)

        if (note) {
            res.status(404).send("note.found")
        }
        const updatingNote = await Note.find({})
        res.status(200).json(updatingNote)
    } catch (error) {
        res.status(404).send(error.message)
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
        res.status(404).send(error.message)
    }
}
const getNoteById = async(req, res)=>{
try {
    const {id} = req.params
    const getId = await Note.findById(id)
    res.status(200).json(getId)
} catch (error) {
    console.log(error)
}
}
module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNote,
    getNoteById
}