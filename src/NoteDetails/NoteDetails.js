import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import DeleteButton from "../DeleteButton/DeleteButton";

export default function NoteDetails(props) {
  return (
    <Link className="link" to={`/note/${props.note.id}`}>
      <h3>{props.note.title}</h3>
      <p>Last modified: {props.note.modified}</p>

      <DeleteButton note={props.note} history={props.history} />
    </Link>
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
