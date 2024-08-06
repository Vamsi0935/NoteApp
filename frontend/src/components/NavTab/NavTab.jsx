/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
//import { Link } from "react-router-dom";

const NavTab = ({ tabs, setTabs }) => {
  return (
    <div>
      <ul className="nav pb-3">
        <li className="nav-item">
          <a
            onClick={() => setTabs("All")}
            className={`nav-link ${tabs === "All" ? "active" : ""}`}
          >
            All
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => setTabs("Home")}
            className={`nav-link ${tabs === "Home" ? "active" : ""}`}
          >
            Home
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavTab;
