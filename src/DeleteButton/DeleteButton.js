import React from "react";
import PropTypes from "prop-types";
import config from "../config";
import Context from "../Context";

export default class DeleteButton extends React.Component {
  static contextType = Context;

  handleDelete = (e) => {
    e.preventDefault();
    const { id } = this.props.note;
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    };

    fetch(`${config.API_URL}/api/notes/${id}`, deleteOptions)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        this.context.deleteNote(id);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <button type="button" onClick={(e) => this.handleDelete(e)}>
        Delete Note
      </button>
    );
  }
}

DeleteButton.defaultProps = {
  note: {},
};

DeleteButton.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  history: PropTypes.object.isRequired,
};
