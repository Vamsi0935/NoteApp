import React, { useState } from "react";
import Modal from "react-modal";
import AddEditNote from "../../Home/AddEditNote";

const AddButton = ({ getAllNotes }) => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <div>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          Add Notes
        </button>
        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=""
          className="container w-50 my-5 p-5 bg bg-light rounded"
        >
          <AddEditNote
            onClose={() =>
              setOpenAddEditModal({ isShown: false, type: "add", data: null })
            }
            noteData={openAddEditModal.data}
            type={openAddEditModal.type}
            getAllNotes={getAllNotes}
          />
        </Modal>
      </div>
    </>
  );
};

export default AddButton;
