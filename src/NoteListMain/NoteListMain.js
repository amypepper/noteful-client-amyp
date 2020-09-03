import React from "react";
import { Link } from "react-router-dom";

import Context from "../Context";
import NoteDetails from "../NoteDetails/NoteDetails";

export default class NoteListMain extends React.Component {
  static contextType = Context;

  getNotes = () => {
    if (this.props.match.params.folderid) {
      const filteredNotes = this.context.filterNotes(
        this.props.match.params.folderid
      );
      return filteredNotes.map((note, i) => (
        <NoteDetails note={note} key={i} />
      ));
    } else {
      return this.context.notes.map((note, i) => (
        <NoteDetails note={note} key={i} />
      ));
    }
  };
  render() {
    return (
      <ul>
        {this.getNotes()}
        <Link to="/add-note">
          <button>Add Note</button>
        </Link>
      </ul>
    );
  }
}
