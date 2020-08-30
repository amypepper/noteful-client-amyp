import React from "react";

export default class NotePageNav extends React.Component {
  render() {
    return (
      <div className="App__nav">
        <p>{this.props.folder.map((folderObj) => folderObj.name)}</p>
        <button type="button" onClick={() => this.props.history.goBack()}>
          Go back
        </button>
      </div>
    );
  }
}
