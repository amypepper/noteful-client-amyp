import React from "react";

import NoteDetails from "../NoteDetails/NoteDetails";

export default function NotePageMain(props) {
  if (props.match.params.noteid === props.selected.note.id) {
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
  return <div>Cannot find that Note ID</div>;
}
