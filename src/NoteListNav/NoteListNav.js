import React from "react";
import data from "../dummy-store";

export default function NoteListNav() {
  return (
    <ul>
      {data["folders"].map((folder) => (
        <li>{folder.name}</li>
      ))}
      <button>Add folder</button>
    </ul>
  );
}
