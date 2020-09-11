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
      .then((folders) => this.setState({ folders }));

    fetch(`${config.API_ENDPOINT}/notes`)
      .then((res) => res.json())

      .then((notes) => this.setState({ notes }));
  }

  render() {
    return (
      <ErrorBoundary>
        <Context.Provider value={this.state}>
          <div className="App">
            <header className="App__header">
              <Link className="link" to="/">
                <h1 className="App__header">Noteful</h1>
              </Link>
            </header>
            <div className="main-content__wrapper">
              <nav className="App__nav">
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <NoteListNav />;
                  }}
                />

                <Route
                  path="/note/:noteid"
                  render={(routeProps) => {
                    const selectedNote = this.state.findSelectedNote(
                      routeProps.match.params.noteid
                    );

                    const noteFolder = this.state.folders.find((folder) => {
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
                <Route
                  exact
                  path="/"
                  render={(routeProps) => <NoteListMain {...routeProps} />}
                />

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

                <Route
                  path="/folder/:folderid"
                  render={(routeProps) => {
                    return <NoteListMain {...routeProps} />;
                  }}
                />

                <ErrorBoundary>
                  <Route
                    path="/add-folder"
                    render={(routeProps) => <AddFolder {...routeProps} />}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Route
                    path="/add-note"
                    render={(routeProps) => <AddNote {...routeProps} />}
                  />
                </ErrorBoundary>
              </main>
            </div>
          </div>
        </Context.Provider>
      </ErrorBoundary>
    );
  }
}

export default App;
