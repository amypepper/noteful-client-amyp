import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import PropTypes, { arrayOf } from "prop-types";
import "./NoteListMain.css";

export default function NoteListMain(props) {
  return (
    <section className="NoteListMain">
      <ul>
        {props.notes.map((note) => (
          <li key={note.id}>
            <Note id={note.id} name={note.name} modified={note.modified} />
          </li>
        ))}
      </ul>
      <div className="NoteListMain__button-container">
        <CircleButton
          tag={Link}
          to="/add-note"
          type="button"
          className="NoteListMain__add-note-button"
        >
          <FontAwesomeIcon icon="plus" />
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  );
}

NoteListMain.propTypes = {
  notes: arrayOf(PropTypes.object),
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

NoteListMain.defaultProps = {
  notes: [],
};
