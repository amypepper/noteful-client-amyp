import React from "react";
import { NavLink } from "react-router-dom";

export default class NotePageNav extends React.Component {
  render() {
    return (
      <div className="App__nav">
        <p>
          {this.props.folder.map((folderObj, i) => (
            <NavLink key={i} to={`/folder/${folderObj.id}`}>
              {folderObj.name}
            </NavLink>
          ))}
        </p>
        <button type="button" onClick={() => this.props.history.goBack()}>
          Go back
        </button>
      </div>
    );
  }
}
