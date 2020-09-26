import React from "react";
import { NavLink } from "react-router-dom";

import Context from "../Context";
import DeleteButton from "../DeleteButton/DeleteButton";
import "./NoteListNav.css";

export default class NoteListNav extends React.Component {
  static contextType = Context;

  render() {
    return (
      <ul className="App__nav">
        {this.context.folders.map((folder, i) => {
          return (
            <div key={i + "d"}>
              <NavLink className="link" key={i} to={`/folder/${folder.id}`}>
                <li key={i}>{folder.title}</li>
              </NavLink>
              <DeleteButton
                key={i + "b"}
                folder={{ ...folder }}
                history={this.props.history}
              />
            </div>
          );
        })}
        <NavLink className="link" to="/add-folder">
          <button>Add folder</button>
        </NavLink>
      </ul>
    );
  }
}
