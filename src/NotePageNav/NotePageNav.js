import React from "react";

export default class NotePageNav extends React.Component {
  render() {
    return (
      <div className="App__nav">
        <button>Go back</button>
        <div>{this.props.folder.name}</div>
      </div>
    );
  }
}
