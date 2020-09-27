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
    folderTitle: "",
    touched: false,
  };

  //   validateNoteName() {
  //     const noteName = this.state.note.title.trim();
  //     if (noteName.length === 0) {
  //       return "Name is required";
  //     } else if (noteName.length < 3) {
  //       return "Name must be at least 3 characters long";
  //     }
  //   }

  getCurrentFolder = () => {
    const folderId = this.state.folder_id;
    return this.context.folders.find((folder) => folder.id === folderId);
  };

  //   setCurrentFolderTitle = () => {
  //       const folderObj = this.getCurrentFolder();
  //       if (folderObj) {
  //           this.setState({folderTitle: folderObj.title})
  //       } else {
  //           return ""
  //       }

  //   }

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
    this.setState({
      folder: "blank",
    });
  };

  //   handleSubmit = (e) => {
  //     e.preventDefault();
  //     const { note } = this.state;
  //     const newNoteObj = {
  //       title: note.title,
  //     };

  // const patchOptions = {
  //   method: "PATCH",
  //   headers: {
  //     "content-type": "application/json",
  //     Authorization: `Bearer ${config.API_KEY}`,
  //   },
  //   body: JSON.stringify(newNoteObj),
  // };

  //     fetch(
  //       `${config.API_URL}/api/notes/${this.props.match.params.noteid}`,
  //       patchOptions
  //     )
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error("Something went wrong, please try again later");
  //         }
  //         return res.json();
  //       })
  //       .then((note) => {
  //         this.context.updateNote(note);
  //         this.props.history.push(`/note/${note.id}`);
  //       })
  //       .catch((err) => {
  //         this.setState({
  //           error: err.message,
  //         });
  //       });
  //   };

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
      .then((note) =>
        this.setState({
          ...note,
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

          <label htmlFor="update-note-folder">Folder</label>
          <select
            name="update-note-folder"
            id="update-note-folder"
            value={this.state.folderTitle}
            onChange={(e) => this.changeNoteFolder(e.target.value)}
          >
            {this.context.folders.map((folder, i) => (
              <option key={i} value={folder.title}>
                {folder.title}
              </option>
            ))}
          </select>

          {/* {this.state.note.touched && (
            <ValidationError message={this.validateNoteName()} />
          )} */}
        </fieldset>
        <fieldset className="button__group">
          <button
            type="submit"
            className="button"
            // disabled={this.validateNoteName()}
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
