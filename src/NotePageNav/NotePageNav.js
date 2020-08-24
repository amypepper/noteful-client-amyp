import React from "react";

export default function NotePageNav(props) {
  return (
    <>
      <button>Go back</button>
      <div>Folder: {props.selected.folder.name}</div>
    </>
  );
}
