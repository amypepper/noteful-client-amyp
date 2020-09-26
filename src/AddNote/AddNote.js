import React, { Component } from "react";

import "./AddNote.css";
import config from "../config";
import Context from "../Context";
import PropTypes from "prop-types";
import ValidationError from "../ValidationError";

export default class AddNote extends Component {
  static contextType = Context;

  state = {
    title: {
      value: "",
    },
    content: {
      value: "",
    },
    folder: {
      value: "",
    },
    folder_id: "",
    touched: false,
  };

  updateNoteName = (noteName) => {
    this.setState({
      title: {
        value: noteName,
      },
      touched: true,
    });
  };

  updateNoteContent = (noteContent) => {
    this.setState({
      content: {
        value: noteContent,
      },
      touched: true,
    });
  };

  updateNoteFolder = (noteFolder) => {
    this.setState({
      folder: {
        value: noteFolder,
      },
      folder_id: this.getFolderId(noteFolder),
      touched: true,
    });
  };

  getFolderId = (noteFolder) => {
    const folderObj = this.context.folders.find(
      (folder) => folder.title === noteFolder
    );
    return folderObj.id;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, folder_id } = this.state;

    const newNoteObj = {
      title: title.value,
      folder_id: folder_id,
      content: content.value,
    };
    const postOptions = {
      method: "POST",

      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
      body: JSON.stringify(newNoteObj),
    };

    fetch(`${config.API_URL}/api/notes`, postOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.push(`/note/${note.id}`);
      })
      .catch((err) => {
        this.setState({
          error: err.messge,
        });
      });
  };

  validateNoteName = () => {
    const noteName = this.state.title.value.trim();
    if (noteName.length === 0) {
      return "name is required";
    } else if (noteName.length < 3) {
      return "name must be at least 3 characters long";
    }
  };

  validateNoteContent = () => {
    const content = this.state.content.value.trim();
    if (!content.length) {
      return "Content is required";
    }
  };

  validateFolderSelection = () => {
    const folder = this.state.folder.value.trim();
    if (folder.length === 0) {
      return "You must select a folder";
    }
  };

  render = () => {
    return (
      <form className="add-note-form" onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <div className="add-name-content-folder" id="note-form-wrapper">
            <label htmlFor="note-name">New Note Name</label>
            <input
              type="text"
              name="note-name"
              id="note-name"
              value={this.state.title.value}
              onChange={(e) => this.updateNoteName(e.target.value)}
            />
            {this.state.touched && (
              <ValidationError message={this.validateNoteName()} />
            )}
            <label htmlFor="note-content">Content</label>
            <textarea
              name="note-content"
              id="note-content"
              cols="40"
              rows="5"
              value={this.state.content.value}
              onChange={(e) => this.updateNoteContent(e.target.value)}
            >
              Add your note here
            </textarea>
            {this.state.touched && (
              <ValidationError message={this.validateNoteContent()} />
            )}
            <label htmlFor="note-folder-select">Folder</label>
            <select
              name="note-folder"
              id="note-folder-select"
              value={this.state.folder.value}
              onChange={(e) => this.updateNoteFolder(e.target.value)}
            >
              <option value="">Please choose a folder</option>
              {this.context.folders.map((folder, i) => (
                <option key={i} value={folder.title}>
                  {folder.title}
                </option>
              ))}
            </select>
            {this.state.touched && (
              <ValidationError message={this.validateFolderSelection()} />
            )}
          </div>
        </fieldset>
        <fieldset className="button__group">
          <button
            type="submit"
            className="button"
            disabled={
              (this.state.title.value.length === 0) |
              (this.state.content.value.length === 0) |
              (this.state.folder.value.length === 0)
            }
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
  };
}

AddNote.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
