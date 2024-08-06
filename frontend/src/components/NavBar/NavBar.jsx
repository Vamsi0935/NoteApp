import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };
  return (
    <>
      <div className="bg bg-light p-4 shadow p-3 mb-5 bg-body-tertiary rounded d-flex justify-content-evenly">
        <h2>
          <span className="text-primary">Good</span>
          <span>Notes</span>
        </h2>
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </div>
    </>
  );
};

export default Navbar;
