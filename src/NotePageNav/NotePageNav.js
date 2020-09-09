import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export default class NotePageNav extends React.Component {
  render() {
    return (
      <div className="App__nav">
        <p>
          <NavLink to={`/folder/${this.props.folder.id}`}>
            {this.props.folder.name}
          </NavLink>
        </p>
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
    name: "",
  },
  history: {},
};

NotePageNav.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  history: PropTypes.object.isRequired,
};
