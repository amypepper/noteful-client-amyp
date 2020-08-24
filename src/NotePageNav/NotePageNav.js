import React from "react";

export default function NotePageNav(props) {
  return (
    <>
      <button>Go back</button>
      <div>{props.selected.folder.name}</div>
    </>
  );
}
