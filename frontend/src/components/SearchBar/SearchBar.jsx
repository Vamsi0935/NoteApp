import React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="d-flex align-items-center w-25">
      <div className="input-group">
        <div className="input-group-text">
          <IoIosSearch onClick={handleSearch} />
        </div>
        <input
          type="text"
          className="form-control "
          id="autoSizingInputGroup"
          placeholder="Search notes......"
          value={value}
          onChange={onChange}
        />

        {value && (
          <div className="input-group-text">
            <IoCloseSharp onClick={onClearSearch} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
