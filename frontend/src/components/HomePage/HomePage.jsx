import React from "react";
import AddButton from "./AddButton";
import ViewNotes from "./ViewNotes";

const HomePage = ({ setTabs, getAllNotes }) => {
  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle">
        <h1 className="display-1 text-light animate__animated animate__bounce animate__repeat-2">
          GoodNote Making App
        </h1>
        <div className="d-flex justify-content-center align-items-center">
          <AddButton getAllNotes={getAllNotes} />
          <ViewNotes setTabs={setTabs} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
