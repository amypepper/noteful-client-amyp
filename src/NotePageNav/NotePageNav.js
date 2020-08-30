import React from "react";

export default class NotePageNav extends React.Component {
  render() {
    return (
      <div className="App__nav">
        <p>{this.props.folder.map((folderObj) => folderObj.name)}</p>
        <button>Go back</button>
      </div>
    );
  }
}
