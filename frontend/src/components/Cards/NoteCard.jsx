import React from "react";
import "./notecard.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import moment from "moment";

const NoteCard = ({ title, content, date, onEdit, onDelete }) => {
  return (
    <div className="border rounded p-4 bg bg-light noteCard">
      <div>
        <div className="d-flex justify-content-end align-items-left gap-4">
          <MdModeEdit onClick={onEdit} className="editIcon-btn" />
          <RiDeleteBinFill onClick={onDelete} className="deleteIcon-btn" />
        </div>
        <div className="body-card">
          <h4 className="display-6">{title}</h4> 
          <span className="fw-light clamp-text">{content}</span>
        </div>
      </div>
      <div className="text-end text-success">
        <span>{moment(date).format("Do MMM YYYY")}</span>
      </div>
    </div>
  );
};

export default NoteCard;
