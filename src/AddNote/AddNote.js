import React, { Component } from "react";

import "./AddNote.css";
import config from "../config";
import Context from "../Context";
import PropTypes from "prop-types";
import ValidationError from "../ValidationError";

export default class AddNote extends Component {
  static contextType = Context;

  state = {
    name: {
      value: "",
    },
    content: {
      value: "",
    },
    folder: {
      value: "",
    },
    folderId: "",
    touched: false,
  };

  updateNoteName = (noteName) => {
    this.setState({
      name: {
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
      folderId: this.getFolderId(noteFolder),
      touched: true,
    });
  };

  getFolderId = (noteFolder) => {
    const folderObj = this.context.folders.find(
      (folder) => folder.name === noteFolder
    );
    return folderObj.id;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, content, folderId } = this.state;

    // create the value I want to POST
    const newNoteObj = {
      name: name.value,
      modified: new Date(Date.now()),
      folderId: folderId,
      content: content.value,
    };
    const postOptions = {
      method: "POST",
      // must provide `'content-type` for security purposes
      headers: {
        "content-type": "application/json",
      },
      // turn newnoteObj into JSON
      body: JSON.stringify(newNoteObj),
    };

    fetch(`${config.API_ENDPOINT}/notes`, postOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((data) => {
        // pass the API's response obj to the callback
        // prop so that App's state can be updated
        this.context.addNote(data);
        // takes user back to home page after API request is fulfilled
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          error: err.messge,
        });
      });
  };

  validateNoteName = () => {
    const noteName = this.state.name.value.trim();
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
              value={this.state.name.value}
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
                <option key={i} value={folder.name}>
                  {folder.name}
                </option>
              ))}
            </select>
            {this.state.touched && (
              <ValidationError message={this.validateFolderSelection()} />
            )}
          </div>
          {/* runs validation only when user starts typing */}
        </fieldset>
        <fieldset className="button__group">
          <button
            type="submit"
            className="button"
            // keeps save button inaccessible until note info passes
            // validation
            disabled={
              (this.state.name.value.length === 0) |
              (this.state.content.value.length === 0) |
              (this.state.folder.value.length === 0)
            }
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
  };
}

AddNote.propTypes = {
  context: PropTypes.shape({
    addNote: PropTypes.func.isRequired,
    folders: PropTypes.array.isRequired,
  }),
  history: PropTypes.object.isRequired,
};
