import React from "react";
import "./NoteListNav.css";
import { NavLink } from "react-router-dom";

export default class NoteListNav extends React.Component {
  render() {
    return (
      <ul className="App__nav">
        {this.props.folders.map((folder, i) => {
          return (
            <NavLink to={`/folder/${folder.id}`}>
              <li key={i}>{folder.name}</li>
            </NavLink>
          );
        })}
        <button>Add folder</button>
      </ul>
    );
  }
}
