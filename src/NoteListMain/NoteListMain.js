import React from "react";
import { Link } from "react-router-dom";

import NoteDetails from "../NoteDetails/NoteDetails";

export default class NoteListMain extends React.Component {
  render() {
    return (
      <ul>
        {this.props.notes.map((note, i) => (
          <NoteDetails note={note} key={i} />
        ))}
        <Link to="/add-note">
          <button>Add Note</button>
        </Link>
      </ul>
    );
  }
}
