import React from "react";
import Context from "../Context";

export default class NotePageNav extends React.Component {
  static contextType = Context;

  render() {
    if (this.props.match.params.noteid === this.context.selected.note.id) {
      return (
        <div className="App__nav">
          <button>Go back</button>
          <div>{this.context.selected.folder.name}</div>
        </div>
      );
    }
    return null;
  }
}
