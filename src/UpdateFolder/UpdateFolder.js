import React, { Component } from "react";
import config from "../config";
import Context from "../Context";
import ValidationError from "../ValidationError";

export default class UpdateFolder extends Component {
  static contextType = Context;

  state = {
    folder: {
      title: "",
      touched: false,
    },
  };

  validateFolderName() {
    const folderName = this.state.folder.title.trim();
    if (folderName.length === 0) {
      return "Name is required";
    } else if (folderName.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  getCurrentFolder = () => {
    const { folderid } = this.props.match.params;
    return this.context.folders.find(
      (folder) => folder.id === Number(folderid)
    );
  };

  changeFolder = (folderName) => {
    this.setState({
      folder: {
        title: folderName,
        touched: true,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { folder } = this.state;
    const newFolderObj = {
      title: folder.title,
    };

    const patchOptions = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
      body: JSON.stringify(newFolderObj),
    };

    fetch(
      `${config.API_URL}/api/folders/${this.props.match.params.folderid}`,
      patchOptions
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((folder) => {
        this.context.updateFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  };

  clearValues = () => {
    this.setState({
      folder: { title: "", touched: false },
    });
  };

  render() {
    const currentFolder = this.getCurrentFolder();

    return (
      <form
        className="update-folder-form"
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <fieldset>
          <legend>
            Current Folder Name:
            {currentFolder && currentFolder.title}
          </legend>

          <label htmlFor="update-folder">New Folder Name</label>
          <input
            type="text"
            name="update-folder"
            id="update-folder"
            value={this.state.folder.title}
            onChange={(e) => this.changeFolder(e.target.value)}
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
