import React from "react";

const ViewNotes = ({ setTabs }) => {
  return (
    <div>
      <button
        className="btn btn-outline-success m-5"
        onClick={() => setTabs("All")}
      >
        ViewNotes page
      </button>
    </div>
  );
};

export default ViewNotes;
