import Note from "../models/note.model.js";
import { errorHandler } from "../utils/error.js";

export const addNote = async (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return next(errorHandler(400, "Title is required."));
  }
  if (!content) {
    return next(errorHandler(400, "Content is required."));
  }

  try {
    const note = new Note({
      title,
      content,
    });
    await note.save();
    res.status(201).json({
      success: true,
      message: "Note added successfully.",
      note,
    });
  } catch (error) {
    next(error);
  }
};

export const editNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);

  if (!note) {
    return next(errorHandler(404, "Note not found."));
  }

  const { title, content } = req.body;
  if (!title && !content) {
    return next(errorHandler(400, "No changes provided."));
  }

  try {
    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    await note.save();
    res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      note,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  //const userId = req.user.id;

  try {
    const notes = await Note.find({});
    res.status(200).json({
      success: true,
      message: "All notes retrieved successfully.",
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    const note = await Note.findOne({ _id: noteId });
    if (!note) {
      return next(errorHandler(404, "Note not found."));
    }

    await Note.deleteOne({ _id: noteId });
    res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const searchNote = async (req, res, next) => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return next(
      errorHandler(400, "Search query is required and must be a string.")
    );
  }

  try {
    const matchingNotes = await Note.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Notes matching the search query retrieved successfully.",
      notes: matchingNotes,
    });
  } catch (error) {
    next(error);
  }
};
