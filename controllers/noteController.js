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

        return res.status(200).json({
            success: true,
            messsage: "successfully fetched note",
            data: {
                totalNote,
                notes,
                totalPage: Math.ceil(totalNote / limitNum),
                currentPage: pageNum
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                details: error.message,
            }
        });
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
        return res.status(201).json({
            success: true,
            message: "successfully created Note",
            data: note
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                details: error.message,
            }
        });
    }
};
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndUpdate(id, req.body, { new: true });
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found or you do not have permission to update note",
                error: {
                    code: "NOTE_UNAVAILABLE_OR_NO_UPDATE_PERMISSION",
                    details: "Note not found or you do not have permission to update note"
                }
            });
        }
        res.status(200).json({
            success: true,
            message: "successfully updated Note",
            data: note
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                details: error.message,
            }
        });
    }
};
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found or you do not have permission to Delete note",
                error: {
                    code: "NOTE_UNAVAILABLE_OR_NO_DELETE_PERMISSION",
                    details: "Note not found or you do not have permission to delete note"
                }
            });
        }
        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                details: error.message,
            }
        });
    }
};
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const getId = await Note.findById(id);
        if (!getId) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
                error: {
                    code: "NOTE_UNAVAILABLE",
                    details: "Note not found"
                }
            });
        }
        res.status(200).json({
            success: true,
            message: "Note successfully fetched ById",
            data: getId
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                details: error.message,
            }
        });
    }
};
module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNote,
    getNoteById,
}