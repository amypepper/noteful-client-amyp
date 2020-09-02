import React from "react";

import NoteDetails from "../NoteDetails/NoteDetails";

export default function NotePageMain(props) {
  return (
    <>
      <section>
        <NoteDetails note={props.note} />
      </section>
      <section>
        <p>{props.note.map((noteObj) => noteObj.content)}</p>
      </section>
    </>
  );
}
