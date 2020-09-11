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
      },
    };

    fetch(`${config.API_ENDPOINT}/notes/${id}`, deleteOptions)
      .then((res) => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then((error) => {
            // then throw it
            throw error;
          });
        }
        return res.json();
      })
      .then(() => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        this.context.deleteNote(id);
        // go back to the home page
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
    id: PropTypes.string,
  }).isRequired,
  history: PropTypes.object.isRequired,
  context: PropTypes.shape({
    deleteNote: PropTypes.elementType,
  }),
};
