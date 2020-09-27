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
    const { folder } = this.state;
    const newFolderObj = {
      title: folder.value,
    };
    const postOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
      body: JSON.stringify(newFolderObj),
    };

    fetch(`${config.API_URL}/api/folders`, postOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((folder) => {
        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
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
          <label htmlFor="add-folder">New Folder Name</label>
          <input
            type="text"
            name="add-folder"
            id="add-folder"
            value={this.state.folder.value}
            onChange={(e) => this.updateFolder(e.target.value)}
          />

          {this.state.folder.touched && (
            <ValidationError message={this.validateFolderName()} />
          )}
        </fieldset>
        <fieldset className="button__group">
          <button
            type="submit"
            className="button"
            disabled={this.validateFolderName()}
          >
            Save
          </button>
          <button
            type="reset"
            className="button"
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
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
