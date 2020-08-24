import React from "react";
import data from "../dummy-store";
import NoteDetails from "../NoteDetails/NoteDetails";

export default function NoteListMain(props) {
  return (
    <ul>
      {data["notes"].map((note, i) => (
        <li>
          <NoteDetails note={note} key={i} />
        </li>
      ))}
    </ul>
  );
}
