import React, { Component } from "react";
import config from "../config";
import Context from "../Context";
import ValidationError from "../ValidationError";

export default class UpdateNote extends Component {
  static contextType = Context;

  state = {
    id: null,
    title: "",
    content: "",
    modified: "",
    folder_id: null,
    touched: false,
  };

  validateNoteName() {
    const noteName = this.state.title.trim();
    if (noteName.length === 0) {
      return "Name is required";
    } else if (noteName.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  changeNoteName = (noteName) => {
    this.setState({
      title: noteName,
      touched: true,
    });
  };

  changeNoteContent = (noteContent) => {
    this.setState({
      content: noteContent,
      touched: true,
    });
  };

  changeNoteFolder = (newNoteFolder) => {
    this.setState({
      folder_id: newNoteFolder.id,
    });
  };

  getCurrentFolderById = () => {
    const getCurrentFolder = this.context.folders.find(
      (folder) => folder.id === this.state.folder_id
    );
    if (getCurrentFolder) {
      return getCurrentFolder.title;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, title, content, folder_id } = this.state;
    const newNoteObj = {
      id,
      title,
      modified: Date.now().toString(),
      content,
      folder_id,
    };
    const patchOptions = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
      body: JSON.stringify(newNoteObj),
    };

    fetch(
      `${config.API_URL}/api/notes/${this.props.match.params.noteid}`,
      patchOptions
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        this.context.updateNote(newNoteObj);
        this.props.history.push(`/note/${newNoteObj.id}`);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  };

  clearValues = () => {
    this.setState({
      note: { title: "", touched: false },
    });
  };

  componentDidMount() {
    const { noteid } = this.props.match.params;
    const options = {
      headers: {
        Authorization: `Bearer ${config.API_KEY}`,
        Accept: "application/json",
      },
    };
    fetch(`${config.API_URL}/api/notes/${noteid}`, options)
      .then((res) => res.json())
      .then((note) => {
        return this.setState({
          ...note,
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
      <form className="update-note-form" onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <label htmlFor="update-note-title">Note Name</label>
          <input
            type="text"
            name="update-note-title"
            id="update-note-title"
            value={this.state.title}
            onChange={(e) => this.changeNoteName(e.target.value)}
          />

          <label htmlFor="update-note-content">Note Content</label>
          <textarea
            cols="40"
            rows="20"
            name="update-note-content"
            id="update-note-content"
            value={this.state.content}
            onChange={(e) => this.changeNoteContent(e.target.value)}
          />

          <label htmlFor="update-note-folder">Updated Folder</label>
          <select
            name="update-note-folder"
            id="update-note-folder"
            // select's value attr. is what actually gets sent to changeNoteFolder
            // select's value is changed every time an <option> is clicked
            value={this.state.folder_id}
            onChange={(e) => this.changeNoteFolder(e.target.value)}
          >
            <option value={this.state.folder_id}>
              {this.getCurrentFolderById()}
            </option>
            {this.context.folders.map((folder, i) => (
              // option's `value` attr. represents what is actually sent to <select>'s value attr.
              // doesn't change what users see
              <option key={i} value={folder.id}>
                {folder.title}
              </option>
            ))}
          </select>

          {this.state.touched && (
            <ValidationError message={this.validateNoteName()} />
          )}
        </fieldset>
        <fieldset className="button__group">
          <button
            type="submit"
            className="button"
            disabled={this.validateNoteName()}
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
