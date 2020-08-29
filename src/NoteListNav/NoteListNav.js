import React from "react";
import "./NoteListNav.css";
import { NavLink } from "react-router-dom";

export default class NoteListNav extends React.Component {
  render() {
    return (
      <ul className="App__nav">
        {this.props.folders.map((folder, i) => {
          return (
            <NavLink key={i} to={`/folder/${folder.id}`}>
              <li key={i}>{folder.name}</li>
            </NavLink>
          );
        })}
        <NavLink to="/add-folder">
          <button>Add folder</button>
        </NavLink>
      </ul>
    );
  }
}
