import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import config from "../config";
import Context from "../Context";
import NotefulError from "../NotefulError";
import NoteListMain from "../NoteListMain/NoteListMain";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageMain from "../NotePageMain/NotePageMain";
import NotePageNav from "../NotePageNav/NotePageNav";

import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: [],
    findFolder: (folderId) => {
      return this.state.folders.filter((folder) => folder.id === folderId);
    },

    findSelectedNote: (noteId) => {
      return this.state.notes.find((note) => note.id === noteId);
    },

    filterNotes: (folderId) => {
      return this.state.notes.filter((note) => note.folderId === folderId);
    },

    addFolder: (newFolder) => {
      this.setState({
        folders: [...this.state.folders, newFolder],
      });
    },

    addNote: (newNote) => {
      this.setState({
        notes: [...this.state.notes, newNote],
      });
    },

    deleteNote: (noteId) => {
      this.setState({
        notes: this.state.notes.filter((note) => note.id !== noteId),
      });
    },
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
      <NotefulError>
        <Context.Provider value={this.state}>
          <div className="App">
            <header className="App__header">
              <Link className="link" to="/">
                <h1 className="App__header">Noteful</h1>
              </Link>
            </header>
            <div className="main-content__wrapper">
              <nav className="App__nav">
                {/* This route's job is to render all the folders on the 
          home page */}
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <NoteListNav />;
                  }}
                />

                {/* this route's job is to render the nav sidebar that shows the
          folder containing the currently selected note, plus a Go Back
          button */}
                <Route
                  path="/note/:noteid"
                  // filter for the folder whose id matches the `folderid` of the
                  // note from the URL
                  render={(routeProps) => {
                    // grab the note from state based on the noteid in the URL
                    const selectedNote = this.state.findSelectedNote(
                      routeProps.match.params.noteid
                    );
                    // sort through folders for the id that matches the
                    // `selectedNote` object's folderId key
                    const noteFolder = this.state.folders.find((folder) => {
                      // but first, check that selectedNote[0] exists because
                      // it will be empty when render is first called
                      if (selectedNote) {
                        return folder.id === selectedNote.folderId;
                      }
                      return null;
                    });
                    return (
                      <NotePageNav {...routeProps} folder={{ ...noteFolder }} />
                    );
                  }}
                />

                {/* This route's job is to render the full list of folders for
          navigation purposes; renders when user is viewing the contents of a
          specific folder */}
                <Route
                  path="/folder/:folderid"
                  render={() => {
                    return <NoteListNav />;
                  }}
                />

                <Route path="/add-note" render={() => <NoteListNav />} />

                <Route path="/add-folder" render={() => <NoteListNav />} />
              </nav>
              <main className="App__main">
                {/* This route's job is to render the full list of notes on the 
          home page */}
                <Route
                  exact
                  path="/"
                  render={(routeProps) => <NoteListMain {...routeProps} />}
                />
                {/* This route's job is to render the details of a specific selected
          note, as well as its contents */}

                <Route
                  path="/note/:noteid"
                  render={(routeProps) => {
                    const selectedNote = this.state.findSelectedNote(
                      routeProps.match.params.noteid
                    );
                    return (
                      <NotePageMain
                        note={{ ...selectedNote }}
                        {...routeProps}
                      />
                    );
                  }}
                />

                {/* This route's job is to show only the notes that have the same 
          folderId as the folder that user has clicked on/entered */}
                <Route
                  path="/folder/:folderid"
                  render={(routeProps) => {
                    return <NoteListMain {...routeProps} />;
                  }}
                />

                {/* This route's job is to take you to the form where you can create
          a new folder that will be POSTed to the JSON server; this is the
          only route that needs the addFolder callback prop */}
                <Route
                  path="/add-folder"
                  render={(routeProps) => <AddFolder {...routeProps} />}
                />

                <Route
                  path="/add-note"
                  render={(routeProps) => <AddNote {...routeProps} />}
                />
              </main>
            </div>
          </div>
        </Context.Provider>
      </NotefulError>
    );
  }
}

export default App;
