import React from "react";
import DeleteButton from "../DeleteButton/DeleteButton";
import { NavLink } from "react-router-dom";

export default function NoteDetails(props) {
  return (
    <NavLink className="link" to={`/note/${props.note.id}`}>
      <h3>{props.note.name}</h3>
      <p>{props.note.modified}</p>
      <DeleteButton note={props.note} />
    </NavLink>
  );
}
