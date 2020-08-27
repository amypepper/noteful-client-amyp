import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import data from "../dummy-store";
import NoteListMain from "../NoteListMain/NoteListMain";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageMain from "../NotePageMain/NotePageMain";
import NotePageNav from "../NotePageNav/NotePageNav";

import "./App.css";
import Context from "../Context";

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
    return data["folders"].filter((folder) => folder["id"] === folderId);
  };

  filterNotes = (folderId) => {
    return data["notes"].filter((note) => note["folderId"] === folderId);
  };

  render() {
    return (
      <Context.Provider>
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
                return <NoteListNav folders={data["folders"]} />;
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
                  activeFolder={activeFolder}
                  folders={data["folders"]}
                />
              );
            }}
          />
          <main className="App__main">
            <Route
              exact
              path="/"
              render={() => <NoteListMain notes={data["notes"]} />}
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
          </main>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
