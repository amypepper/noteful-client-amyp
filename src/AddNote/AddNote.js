import React, { Component } from "react";

import config from "../config";
// import ValidationError from "../ValidationError";

export default class AddNote extends Component {
  state = {
    note: {
      title: {
        value: "",
      },
      content: {
        value: "",
      },
      folder: {
        value: "",
      },
      touched: false,
    },
  };
  // updates the local state that controls this component's form
  updateNoteTitle(noteTitle) {
    this.setState({
      note: {
        title: {
          value: noteTitle,
        },
      },
    });
  }

  updateNoteContent(noteContent) {
    this.setState({
      note: {
        content: {
          value: noteContent,
        },
      },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // grab the note obj from local state
    const { note } = this.state;
    // create the value you want to POST (only need name b/c db
    // provides the id)
    const newnoteObj = {
      name: note.value,
    };
    const postOptions = {
      method: "POST",
      // must provide `'content-type` for security purposes
      headers: {
        "content-type": "application/json",
      },
      // turn newnoteObj into JSON
      body: JSON.stringify(newnoteObj),
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
        this.props.addnote(data);
        // takes user back to home page after API request is fulfilled
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  };

  validateNoteName() {
    const noteName = this.state.note.title.value.trim();
    if (noteName.length === 0) {
      return "Name is required";
    } else if (noteName.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  render() {
    return (
      <form className="add-note-form" onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <label htmlFor="note-title">New Note Title</label>
          <input
            type="text"
            name="note-title"
            id="note-title"
            value={this.state.note.title.value}
            onChange={(e) => this.updateNoteTitle(e.target.value)}
          />
          <label htmlFor="note-content">Content</label>
          <input
            type="text"
            name="note-content"
            id="note-content"
            value={this.state.note.content.value}
            onChange={(e) => this.updateNoteContent(e.target.value)}
          />

          {/* <label htmlFor="note-folder">Folder</label>
          <input
            type="text"
            name="note-folder"
            id="note-folder"
            value={this.state.note.folder.value}
            onChange={(e) => this.updateNoteFolder(e.target.value)}
          /> */}

          {/* runs validation only when user starts typing in the input */}
          {/* {this.state.note.touched && (
            <ValidationError message={this.validateNoteName()} />
          )} */}
        </fieldset>
        <fieldset className="button__group">
          <button
            type="submit"
            className="button"
            // keeps save button inaccessible until note name passes
            // validation
            disabled={this.validateNoteName()}
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
