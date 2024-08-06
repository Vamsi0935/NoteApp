import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "../components/Cards/notecard.css";
import axios from "axios";
import Swal from "sweetalert2";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  //edit note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/note/edit/${noteId}`,
        { title, content },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: res.data.message,
        });
        setError(res.data.message);
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Note updated successfully.",
      });

      getAllNotes();
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || error.message,
      });

      console.log(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    }
  };

  //add new note
  const addNewNote = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/note/add",
        {
          title,
          content,
        },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.message,
        });
        setError(res.data.message);
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Note added successfully.",
      });

      getAllNotes();
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || error.message,
      });

      console.log(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title of the note....");
      return;
    }

    if (!content) {
      setError("Please enter the content of the note....");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>Add Note</h4>
        <IoCloseSharp onClick={onClose} className="deleteIcon-btn" />
      </div>
      <div class="mb-3">
        <label htmlFor="modalTitle" class="form-label">
          Title:
        </label>
        <input
          type="text"
          class="form-control"
          id="modalTitle"
          placeholder="Title of the note........"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div class="mb-3">
        <label htmlFor="modalContent" class="form-label">
          Content
        </label>
        <textarea
          class="form-control"
          id="modalContent"
          rows="10"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        {/* <button
          class="btn btn-outline-secondary rounded-pill me-md-2"
          type="button"
        >
          Cancel
        </button> */}
        <button
          className="btn btn-primary rounded-pill"
          onClick={handleAddNote}
        >
          {type === "edit" ? "Update Note" : "Add Note"}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
