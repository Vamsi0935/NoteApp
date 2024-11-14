import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String, 
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Changed to use Date.now as a function reference
    },
  },
  {
    timestamps: true, // Optional: Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
