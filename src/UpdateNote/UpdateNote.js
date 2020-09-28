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
    currentFolderId: null,
    currentFolderTitle: "",
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

  getCurrentFolderTitle = () => {
    const currentFolder = this.context.folders.find(
      (folder) => folder.id === this.state.currentFolderId
    );
    if (currentFolder) {
      return currentFolder.title;
    }
  };

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

  changeNoteFolder = (noteFolderTitle) => {
    const newNoteFolder = this.context.folders.find(
      (folder) => folder.title === noteFolderTitle
    );
    if (newNoteFolder) {
      return this.setState({
        folder_id: newNoteFolder.id,
      });
    }
    return null;
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
        console.log(newNoteObj);
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
          currentFolderId: note.folder_id,
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

          <div>{`Current Folder: ${this.getCurrentFolderTitle()}`}</div>

          <label htmlFor="update-note-folder">Updated Folder</label>
          <select
            name="update-note-folder"
            id="update-note-folder"
            value={this.state.newFolderTitle}
            onChange={(e) => this.changeNoteFolder(e.target.value)}
          >
            <option value={this.state.currentFolderId} />
            {this.context.folders.map((folder, i) => (
              <option key={i} value={folder.title}>
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
