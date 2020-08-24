import React from "react";

import NoteDetails from "../NoteDetails/NoteDetails";

export default function NotePageMain(props) {
  return (
    <>
      <section>
        <NoteDetails note={props.selected.note} />
      </section>
      <section>
        <p>{props.selected.note.content}</p>
      </section>
    </>
  );
}
