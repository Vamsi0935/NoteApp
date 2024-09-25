import React, { useEffect, useState } from "react";
import "./home.css";
import Navbar from "../components/NavBar/NavBar";
import NoteCard from "../components/Cards/NoteCard";
import axios from "axios";
import EmptyCard from "../components/EmptyCard/EmptyCard";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import Swal from "sweetalert2";
import NavTab from "../components/NavTab/NavTab";
import HomePage from "../components/HomePage/HomePage";
const Home = () => {
  const [allNotes, setAllNotes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isSearch, setIsSearch] = useState(false);
  const [tabs, setTabs] = useState("Home");
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    getAllNotes();
  }, []);

  // Fetch all notes
  const getAllNotes = async () => {
    try {
      const res = await axios.get(`https://note-app-api-three.vercel.app/api/note/all`, {
        withCredentials: true,
      });

      if (!res.data.success) {
        console.log("Failed to fetch notes:", res.data.message);
        return;
      }

      setAllNotes(Array.isArray(res.data.notes) ? res.data.notes : []);
    } catch (error) {
      console.log(
        "Error fetching notes:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Delete a note
  const deleteNote = async (data) => {
    const noteId = data._id;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `https://note-app-api-three.vercel.app/api/note/delete/${noteId}`,
          {
            withCredentials: true,
          }
        );

        if (!res.data.success) {
          Swal.fire({
            icon: "error",
            title: "Failed to Delete",
            text: res.data.message,
          });
          return;
        }

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The note has been deleted.",
        });

        getAllNotes();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || error.message,
        });

        console.log("Error:", error.response?.data?.message || error.message);
      }
    }
  };

  // Handle note edit
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const onSearchNote = async (query) => {
    try {
      const config = {
        params: { query },
        withCredentials: true,
      };

      const res = await axios.get(
        "http://localhost:5000/api/note/search",
        config
      );

      if (res.data.success === false) {
        Swal.fire({
          icon: "error",
          title: "Search Failed",
          text: res.data.message,
        });
        return;
      }
      setAllNotes(res.data.notes);
      Swal.fire({
        icon: "success",
        title: "Search Successful",
        text: "Notes matching your query were retrieved successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "An unexpected error occurred.",
      });
      console.error(
        "Error fetching notes:",
        error.response?.data?.message || error.message
      );
    }
  };
  const handleClearSearch = () => {
    getAllNotes();
  };

  return (
    <>
      {tabs === "All" && (
        <Navbar
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
        />
      )}
      <div className="container text-start pb-5">
        {tabs === "All" && (
          <>
            <h1 className="display-6">Your Notes</h1>
            <NavTab tabs={tabs} setTabs={setTabs} />
          </>
        )}
        {tabs === "All" && (
          <>
            {allNotes.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {allNotes.map((note) => (
                  <div className="col" key={note._id}>
                    <div className="card">
                      <NoteCard
                        title={note.title}
                        date={note.createdAt}
                        content={note.content}
                        onEdit={() => handleEdit(note)}
                        onDelete={() => deleteNote(note)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyCard
                imgSrc={
                  isSearch
                    ? "https://img.freepik.com/free-vector/blank-paper-note-vector_53876-166361.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722470400&semt=ais_hybrid"
                    : "https://wallpapers.com/images/hd/empty-page-of-a-note-zx9ugforlbivtmdg.jpg"
                }
                message={
                  isSearch
                    ? "Oops! No Notes found matching your search"
                    : "Ready to capture your ideas? Click the 'Add' button to start noting down your thoughts, inspiration, and reminders. Let's get started!"
                }
              />
            )}
          </>
        )}
        {tabs === "Home" && (
          <HomePage setTabs={setTabs} getAllNotes={getAllNotes} />
        )}
      </div>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add/Edit Note Modal"
        className="container w-50 my-5 p-5 bg bg-light rounded"
      >
        <AddEditNote
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "edit", data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
