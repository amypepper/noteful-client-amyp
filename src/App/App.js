import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import config from "../config";
import Context from "../Context";
import ErrorBoundary from "../ErrorBoundary";
import NoteListMain from "../NoteListMain/NoteListMain";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageMain from "../NotePageMain/NotePageMain";
import NotePageNav from "../NotePageNav/NotePageNav";

import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: [],

    findSelectedNote: (noteId) => {
      return this.state.notes.find((note) => note.id === Number(noteId));
    },

    filterNotes: (folderId) => {
      return this.state.notes.filter(
        (note) => note.folder_id === Number(folderId)
      );
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

    deleteFolder: (folderId) => {
      this.setState({
        folders: this.state.folders.filter((folder) => folder.id !== folderId),
      });
    },
  };

  componentDidMount() {
    const options = {
      headers: {
        Authorization: `Bearer ${config.API_KEY}`,
        Accept: "application/json",
      },
    };
    fetch(`${config.API_URL}/api/folders`, options)
      .then((res) => res.json())
      .then((folders) => this.setState({ folders }));

    fetch(`${config.API_URL}/api/notes`, options)
      .then((res) => res.json())
      .then((notes) => this.setState({ notes }));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <ErrorBoundary>
          <div className="App">
            <header className="App__header">
              <Link className="link" to="/">
                <h1 className="App__header">Noteful</h1>
              </Link>
            </header>

            <div className="main-content__wrapper">
              <nav className="App__nav">
                <Route exact path="/" component={NoteListNav} />

                <Route
                  path="/note/:noteid"
                  render={(routeProps) => {
                    const selectedNote = this.state.findSelectedNote(
                      routeProps.match.params.noteid
                    );

                    const noteFolder = this.state.folders.find((folder) => {
                      if (selectedNote) {
                        return folder.id === selectedNote.folder_id;
                      }
                      return null;
                    });
                    return (
                      <NotePageNav {...routeProps} folder={{ ...noteFolder }} />
                    );
                  }}
                />

                <Route path="/folder/:folderid" component={NoteListNav} />

                <Route path="/add-note" component={NoteListNav} />

                <Route path="/add-folder" component={NoteListNav} />
              </nav>
              <main className="App__main">
                <Route exact path="/" component={NoteListMain} />

                <Route
                  path="/note/:noteid"
                  render={(routeProps) => {
                    const selectedNote = this.state.findSelectedNote(
                      routeProps.match.params.noteid
                    );
                    return selectedNote ? (
                      <NotePageMain
                        note={{ ...selectedNote }}
                        {...routeProps}
                      />
                    ) : null;
                  }}
                />

                <Route path="/folder/:folderid" component={NoteListMain} />

                <ErrorBoundary>
                  <Route path="/add-folder" component={AddFolder} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Route path="/add-note" component={AddNote} />
                </ErrorBoundary>
              </main>
            </div>
          </div>
        </ErrorBoundary>
      </Context.Provider>
    );
  }
}

export default App;
