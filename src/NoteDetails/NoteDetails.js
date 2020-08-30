import React from "react";
import CircleButton from "../CircleButton/CircleButton";
import { NavLink } from "react-router-dom";

export default function NoteDetails(props) {
  return (
    <NavLink className="link" to={`/note/${props.note.id}`}>
      <h3>{props.note.name}</h3>
      <p>{props.note.modified}</p>
      <CircleButton note={props.note} />
    </NavLink>
  );
}
