import React from "react";
import data from "../dummy-store";
import NoteDetails from "../NoteDetails/NoteDetails";

export default function NoteListMain(props) {
  const unfilteredFolders = data["folders"];
  const filteredFolders = props.filterFolders;

  return (
    <ul>
      {() => {
        if (props.match.params.folderid) {
          return filteredFolders;
        }
        return unfilteredFolders.map((note, i) => (
          <li>
            <NoteDetails note={note} key={i} />
          </li>
        ));
      }}
      <button>Add Note</button>
    </ul>
  );
}
