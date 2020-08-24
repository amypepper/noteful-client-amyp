import React from "react";
import NoteDetails from "../NoteDetails/NoteDetails";

export default function NotePageMain(props) {
  return (
    <>
      <section>
        {/* <h2>{props.selected.note.name}</h2>
        <p>{props.selected.note.modified}</p>
        <button>Delete Note</button> */}
        <NoteDetails note={props.selected.note} />
      </section>
      <section>
        <p>{props.selected.note.content}</p>
      </section>
    </>
  );
}
