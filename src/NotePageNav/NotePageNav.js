import React from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "./NotePageNav.css";

export default class NotePageNav extends React.Component {
  render() {
    return (
      <div className="App__nav">
        <div className="folder-link-wrapper">
          <NavLink
            className="folder-link"
            to={`/folder/${this.props.folder.id}`}
          >
            {this.props.folder.title}
          </NavLink>
          <Link
            className="edit-link"
            to={`/edit/folder/${this.props.folder.id}`}
          >
            Edit Folder
          </Link>
        </div>
        <button type="button" onClick={() => this.props.history.goBack()}>
          Go back
        </button>
      </div>
    );
  }
}

NotePageNav.defaultProps = {
  folder: {
    id: "",
    title: "",
  },
  history: {},
};

NotePageNav.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  history: PropTypes.object.isRequired,
};
