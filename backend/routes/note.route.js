import express from "express";
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
  searchNote,
} from "../controller/note.controller.js";

const router = express.Router();

router.post("/add", addNote); // Route to add a new note
router.put("/edit/:noteId", editNote); // Route to edit an existing note by noteId
router.get("/all", getAllNotes); // Route to get all notes
router.delete("/delete/:noteId", deleteNote); // Route to delete a note by noteId
router.get("/search", searchNote); // Route to search notes

export default router;
 