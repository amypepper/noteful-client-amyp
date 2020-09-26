import React from "react";
import { NavLink } from "react-router-dom";

import Context from "../Context";
import "./NoteListNav.css";

export default class NoteListNav extends React.Component {
  static contextType = Context;

  render() {
    return (
      <ul className="App__nav">
        {this.context.folders.map((folder, i) => {
          return (
            <NavLink className="link" key={i} to={`/folder/${folder.id}`}>
              <li key={i}>{folder.title}</li>
            </NavLink>
          );
        })}
        <NavLink className="link" to="/add-folder">
          <button>Add folder</button>
        </NavLink>
      </ul>
    );
  }
}
