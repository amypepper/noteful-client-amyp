import React from "react";
import data from "../dummy-store";

export default function NoteListMain() {
  return (
    <ul>
      {data["notes"].map((note) => (
        <li>
          <h3>{note.name}</h3>
          <button>Delete Note</button>
        </li>
      ))}
    </ul>
  );
}
