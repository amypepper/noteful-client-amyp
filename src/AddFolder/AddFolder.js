import React from "react";

import config from "../config";
import PropTypes from "prop-types";
import ValidationError from "../ValidationError";
import Context from "../Context";

export default class AddFolder extends React.Component {
  static contextType = Context;

  state = {
    folder: {
      value: "",
      touched: false,
    },
  };
  // updates the local state that controls this component's form
  updateFolder(folderName) {
    this.setState({
      folder: { value: folderName, touched: true },
    });
  }

  clearValues = () => {
    this.setState({
      folder: { value: "", touched: false },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // grab the folder obj from local state
    const { folder } = this.state;
    // create the value you want to POST (only need name b/c db
    // provides the id)
    const newFolderObj = {
      name: folder.value,
    };
    const postOptions = {
      method: "POST",
      // must provide `'content-type` for security purposes
      headers: {
        "content-type": "application/json",
      },
      // turn newFolderObj into JSON
      body: JSON.stringify(newFolderObj),
    };

    fetch(`${config.API_ENDPOINT}/folders`, postOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((data) => {
        // pass the API's response obj to the callback
        // prop so that App's state can be updated
        this.context.addFolder(data);
        // takes user back to home page after API request is fulfilled
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  };

  validateFolderName() {
    const folderName = this.state.folder.value.trim();
    if (folderName.length === 0) {
      return "Name is required";
    } else if (folderName.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  render() {
    return (
      <form className="add-folder-form" onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <label htmlFor="folder">New Folder Name</label>
          <input
            type="text"
            name="folder"
            id="folder"
            value={this.state.folder.value}
            onChange={(e) => this.updateFolder(e.target.value)}
          />
          {/* runs validation only when user starts typing in the input */}
          {this.state.folder.touched && (
            <ValidationError message={this.validateFolderName()} />
          )}
        </fieldset>
        <fieldset className="button__group">
          <button
            type="submit"
            className="button"
            // keeps save button inaccessible until folder name passes
            // validation
            disabled={this.validateFolderName()}
          >
            Save
          </button>
          <button
            type="reset"
            className="button"
            // redirect user to home page on hitting Cancel
            onClick={() => this.props.history.push("/")}
          >
            Cancel
          </button>
        </fieldset>
      </form>
    );
  }
}

AddFolder.propTypes = {
  context: PropTypes.shape({
    addFolder: PropTypes.elementType,
  }),
  history: PropTypes.object.isRequired,
};
