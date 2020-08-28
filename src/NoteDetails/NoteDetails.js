import React from "react";
import CircleButton from "../CircleButton/CircleButton";

export default function NoteDetails(props) {
  return (
    <>
      <h3>{props.note.name}</h3>
      <p>{props.note.modified}</p>
      <CircleButton note={props.note} />
    </>
  );
}
