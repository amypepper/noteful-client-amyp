import React from "react";

export default class NotePageNav extends React.Component {
  render() {
    if (this.props.match.params.noteid === this.props.selected.note.id) {
      return (
        <div className="App__nav">
          <button>Go back</button>
          <div>{this.props.selected.folder.name}</div>
        </div>
      );
    }
    return null;
  }
}
