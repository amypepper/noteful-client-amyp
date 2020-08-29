import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListMain from "../NoteListMain/NoteListMain";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageMain from "../NotePageMain/NotePageMain";
import NotePageNav from "../NotePageNav/NotePageNav";

import "./App.css";
import AddFolder from "../AddFolder/AddFolder";

class App extends Component {
  state = {
    folders: [],
    notes: [],
    selected: {
      folder: {
        id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Important",
      },
      note: {
        id: "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Dogs",
        modified: "2019-01-03T00:00:00.000Z",
        folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        content:
          "Corporis accusamus placeat quas non voluptas. Harum fugit molestias qui. Velit ex animi reiciendis quasi. Suscipit totam delectus ut voluptas aut qui rerum. Non veniam eius molestiae rerum quam.\n \rUnde qui aperiam praesentium alias. Aut temporibus id quidem recusandae voluptatem ut eum. Consequatur asperiores et in quisquam corporis maxime dolorem soluta. Et officiis id est quia sunt qui iste reiciendis saepe. Ut aut doloribus minus non nisi vel corporis. Veritatis mollitia et molestias voluptas neque aspernatur reprehenderit.\n \rMaxime aut reprehenderit mollitia quia eos sit fugiat exercitationem. Minima dolore soluta. Quidem fuga ut sit voluptas nihil sunt aliquam dignissimos. Ex autem nemo quisquam voluptas consequuntur et necessitatibus minima velit. Consequatur quia quis tempora minima. Aut qui dolor et dignissimos ut repellat quas ad.",
      },
    },
  };

  filterFolders = (folderId) => {
    return this.state.folders.filter((folder) => folder["id"] === folderId);
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
    fetch("http://localhost:9090/folders")
      .then((res) => res.json())
      .then((folders) => this.setState({ folders }));
    //

    fetch("http://localhost:9090/notes")
      .then((res) => res.json())
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
              return (
                <NoteListNav
                  addFolder={(newFolder) => this.addFolder(newFolder)}
                  folders={this.state.folders}
                />
              );
            }}
          />
        </nav>
        <Route
          path="/note/:noteid"
          render={(routeProps) => (
            <NotePageNav {...routeProps} {...this.state} />
          )}
        />
        <Route
          path="/folder/:folderid"
          render={(routeProps) => {
            const activeFolder = routeProps.match.params.folderid;
            return (
              <NoteListNav
                {...routeProps}
                {...this.state}
                addFolder={(newFolder) => this.addFolder(newFolder)}
                activeFolder={activeFolder}
                folders={this.state.folders}
              />
            );
          }}
        />
        <main className="App__main">
          <Route
            exact
            path="/"
            render={() => <NoteListMain notes={this.state.notes} />}
          />
          <Route
            path="/note/:noteid"
            render={(routeProps) => (
              <NotePageMain {...routeProps} {...this.state} />
            )}
          />
          <Route
            path="/folder/:folderid"
            render={(routeProps) => {
              const filteredNotes = this.filterNotes(
                routeProps.match.params.folderid
              );
              return <NoteListMain {...routeProps} notes={filteredNotes} />;
            }}
          />
          <Route
            path="/add-folder"
            render={(rprops) => (
              <AddFolder {...rprops} addFolder={this.addFolder} />
            )}
          />
        </main>
      </div>
    );
  }
}

export default App;
