import React from "react";

import NoteDetails from "../NoteDetails/NoteDetails";

export default class NoteListMain extends React.Component {
  render() {
    return (
      <ul>
        {this.props.notes.map((note, i) => (
          <NoteDetails note={note} key={i} />
        ))}
        <button>Add Note</button>
      </ul>
    );
  }
}
