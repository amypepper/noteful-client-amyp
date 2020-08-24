import React from "react";

export default function Note(props) {
  return (
    <>
      <section>
        <h2>{props.selected.note.name}</h2>
        <p>{props.selected.note.modified}</p>
        <button>Delete Note</button>
      </section>
      <section>
        <p>{props.selected.note.content}</p>
      </section>
    </>
  );
}
