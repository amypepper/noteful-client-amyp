import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { countNotesForFolder } from "../notes-helpers";
import "./NoteListNav.css";

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  handleFolderClick(e) {
    return e;
  }

  render() {
    const { folders = [], notes = [] } = this.context;
    console.log("folders from context in notelistnav: ", folders);
    return (
      <div className="NoteListNav">
        <ul className="NoteListNav__list">
          {folders.map((folder) => (
            <li key={folder.id}>
              <NavLink
                className="NoteListNav__folder-link"
                to={`/folder/${folder.id}`}
              >
                <span className="NoteListNav__num-notes">
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="NoteListNav__button-wrapper">
          <CircleButton
            tag={Link}
            to="/add-folder"
            type="button"
            className="NoteListNav__add-folder-button"
            onClick={(e) => {
              this.handleFolderClick(e.target);
            }}
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    );
  }
}

NoteListMain.propTypes = {
  folders: PropTypes.array,
};

NoteListNav.defaultProps = {
  folders: [],
};
