import React from "react";
import PropTypes from "prop-types";
import config from "../config";
import Context from "../Context";
import "./DeleteButton.css";

export default class DeleteButton extends React.Component {
  static contextType = Context;

  handleDelete = (e) => {
    e.preventDefault();

    const id = this.props.note ? this.props.note.id : this.props.folder.id;
    const route = this.props.note ? "notes" : "folders";

    const deleteOptions = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    };

    fetch(`${config.API_URL}/api/${route}/${id}`, deleteOptions)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        } else if (this.props.note) {
          return this.context.deleteNote(id);
        }
        this.context.deleteFolder(id);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <button
        type="button"
        className="delete-button"
        onClick={(e) => this.handleDelete(e)}
      >
        x
      </button>
    );
  }
}

DeleteButton.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number,
  }),
  folder: PropTypes.shape({
    id: PropTypes.number,
  }),
  history: PropTypes.object.isRequired,
};
