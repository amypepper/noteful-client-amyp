import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DeleteButton from "../DeleteButton/DeleteButton";
import "./NoteDetails.css";

export default function NoteDetails(props) {
  return (
    <div className="note-details-wrapper">
      <Link className="link" to={`/note/${props.note.id}`}>
        <h3>{props.note.title}</h3>
      </Link>
      <p>Last modified: {Date(props.note.modified)}</p>
      <Link to={`/edit/note/${props.note.id}`}>Edit Note</Link>
      <DeleteButton note={props.note} history={props.history} />
    </div>
  );
}

NoteDetails.propTypes = {
  note: PropTypes.shape({
    folder_id: PropTypes.number,
    id: PropTypes.number,
    modified: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  history: PropTypes.object.isRequired,
};
