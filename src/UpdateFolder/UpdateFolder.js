import React, { Component } from "react";
import config from "../config";
import Context from "../Context";
import ValidationError from "../ValidationError";

export default class UpdateFolder extends Component {
  static contextType = Context;

  state = {
    id: null,
    title: "",
    date_created: "",
    currentFolderTitle: "",
    touched: false,
  };

  validateFolderName() {
    const folderName = this.state.title.trim();
    if (folderName.length === 0) {
      return "Name is required";
    } else if (folderName.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  // getCurrentFolder = () => {
  //   const { folderid } = this.props.match.params;
  //   return this.context.folders.find(
  //     (folder) => folder.id === Number(folderid)
  //   );
  // };

  changeFolder = (folderName) => {
    this.setState({
      title: folderName,
      touched: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, title, date_created } = this.state;
    const newFolderObj = {
      id,
      title,
      date_created,
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
        this.context.updateFolder(newFolderObj);
        this.props.history.push(`/folder/${newFolderObj.id}`);
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

  componentDidMount() {
    const { folderid } = this.props.match.params;
    const options = {
      headers: {
        Authorization: `Bearer ${config.API_KEY}`,
        Accept: "application/json",
      },
    };
    fetch(`${config.API_URL}/api/folders/${folderid}`, options)
      .then((res) => res.json())
      .then((folder) => {
        return this.setState({
          ...folder,
          currentFolderTitle: folder.title,
        });
      })
      .catch((error) =>
        this.setState({
          error: error.message,
        })
      );
  }

  render() {
    return (
      <form
        className="update-folder-form"
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <fieldset>
          <legend>
            Current Folder Name:
            {this.state.currentFolderTitle}
          </legend>

          <label htmlFor="update-folder">New Folder Name</label>
          <input
            type="text"
            name="update-folder"
            id="update-folder"
            placeholder="New folder name"
            value={this.state.title}
            onChange={(e) => this.changeFolder(e.target.value)}
          />

          {this.state.touched && (
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
