const Note = require("../models/Note")

const getNote = async (req, res) => {
    try {
        const { title, search, content, tags, page = 1, limit = 5 } = req.query;
        const filter = { userId: req.user._id };

        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }
        if (content) {
            filter.content = { $regex: content, $options: "i" };
        }
        if (tags) {
            filter.tags = { $regex: tags, $options: "i" };
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } }
            ];
        }
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 5;
        const skip = (pageNum - 1) * limitNum;

        const totalNote = await Note.countDocuments(filter);
        const notes = await Note.find(filter).skip(skip).limit(limitNum);

        res.status(200).json({
            totalNote,
            notes,
            totalPage: Math.ceil(totalNote / limitNum),
            currentPage: pageNum
        });
    } catch (error) {
        return res.status(404).send(error.message);
    }
};
const createNote = async (req, res) => {
    try {
        const userId = req.user._id;
        const note = new Note({
            userId,
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags
        });
        await note.save();
        res.send(note);
    } catch (error) {
        return res.status(404).send(error.message);
    }
};
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndUpdate(id, req.body, { new: true });
        if (!note) {
            return res.status(404).json({ message: "Note not found or you do not have permission to update note" });
        }
        res.send(note);
    } catch (error) {
        return res.status(404).send(error.message);
    }
};
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).send("Note not found");
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        return res.status(404).send(error.message);
    }
};
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const getId = await Note.findById(id);
        if (!getId) {
            return res.status(404).send("Note not found");
        }
        res.status(200).json(getId);
    } catch (error) {
        return res.status(404).send(error.message);
    }
};
module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNote,
    getNoteById,
}