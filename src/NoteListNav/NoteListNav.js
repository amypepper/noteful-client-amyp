import React from "react";
import data from "../dummy-store";

export default class NoteListNav extends React.Component {
  render() {
    return (
      <ul>
        {this.props.folders.map((folder, i) => (
          <li key={i}>{folder.name}</li>
        ))}
        <button>Add folder</button>
      </ul>
    );
  }
}

{
  /* <ul>
        {filteredFolders.map((folder, i) => (
          <li key={i}>{folder.name}</li>
        ))}
        <button>Add folder</button>
      </ul> */
}
