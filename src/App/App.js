import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import AddFolder from "../AddFolder/AddFolder";
import config from "../config";
import NoteListMain from "../NoteListMain/NoteListMain";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageMain from "../NotePageMain/NotePageMain";
import NotePageNav from "../NotePageNav/NotePageNav";

import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: [],
  };

  findNoteFolder = (noteId) => {
    const selectedNote = this.findSelectedNote(noteId);
    return this.state.folders.filter(
      (folder) => folder.id === selectedNote.folderId
    );
  };
  findSelectedNote = (noteId) => {
    return this.state.notes.filter((note) => note.id === noteId);
  };
  filterNotes = (folderId) => {
    return this.state.notes.filter((note) => note["folderId"] === folderId);
  };

  addFolder = (newFolder) => {
    this.setState({
      folders: [...this.state.folders, newFolder],
    });
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/folders`)
      .then((res) => res.json())
      // calling the data from the API `folders` in the arg for the anony-
      // mous func creates a var called `folders` which becomes the key
      // inside state; since folders is already a key in the state obj,
      // it automatically places the values stored in `folders` in that
      // array stored in state titled `folders`
      .then((folders) => this.setState({ folders }));
    //

    fetch(`${config.API_ENDPOINT}/notes`)
      .then((res) => res.json())
      // the `notes` here also replaces the `notes` array stored in state,
      // just as it did with `folders`
      .then((notes) => this.setState({ notes }));
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <Link to="/">
            <h1>Noteful</h1>
          </Link>
        </header>
        <nav>
          <Route
            exact
            path="/"
            render={() => {
              return <NoteListNav folders={this.state.folders} />;
            }}
          />
          {/* this route's job is to render the nav sidebar that shows the
          folder that contains the currently selected note, plus a Go Back
          button */}
          <Route
            path="/note/:noteid"
            // filter for the folder whose id matches the `folderid` of the
            // note from the URL
            render={(routeProps) => {
              const selectedNote = this.findSelectedNote(
                routeProps.match.params.noteid
              );
              const noteFolder = this.state.folders.filter(
                (folder) => folder.id === selectedNote.folderId
              );
              return <NotePageNav folder={noteFolder} />;
            }}
          />
          <Route
            path="/folder/:folderid"
            render={(routeProps) => {
              return (
                <NoteListNav {...routeProps} folders={this.state.folders} />
              );
            }}
          />
        </nav>
        <main className="App__main">
          {/* This route's job is to render the full list of notes on the 
          home page */}
          <Route
            exact
            path="/"
            render={() => <NoteListMain notes={this.state.notes} />}
          />
          {/* This route's job is to render the details of a specific selected
          note, as well as its contents */}
          <Route
            path="/note/:noteid"
            render={(routeProps) => {
              const selectedNote = this.findSelectedNote(
                routeProps.match.params.noteid
              );
              return <NotePageMain note={selectedNote} />;
            }}
          />
          {/* This route's job is to show only the notes that have the same 
          folderId as the folder that user has clicked on/entered */}
          <Route
            path="/folder/:folderid"
            render={(routeProps) => {
              const filteredNotes = this.filterNotes(
                routeProps.match.params.folderid
              );
              return <NoteListMain notes={filteredNotes} />;
            }}
          />
          {/* This route's job is to take you to the form where you can create
          a new folder that will be POSTed to the JSON server; this is the
          only route that needs the addFolder callback prop */}
          <Route
            path="/add-folder"
            render={(routeProps) => (
              <AddFolder {...routeProps} addFolder={this.addFolder} />
            )}
          />
        </main>
      </div>
    );
  }
}

export default App;
