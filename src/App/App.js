import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import data from "../dummy-store";

import "./App.css";

class App extends Component {
  state = {
    noteView: false,
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

  render() {
    return (
      <div className="App">
        <header>
          <h1>Noteful</h1>
        </header>
        <nav>
          {this.state.noteView ? (
            <div>
              <button>Go back</button>
              <p>Folder: {this.state.selected.folder.name}</p>
            </div>
          ) : (
            <ul>
              {data["folders"].map((folder) => (
                <li>{folder.name}</li>
              ))}
              <button>Add folder</button>
            </ul>
          )}
        </nav>
        <main>
          {this.state.noteView ? (
            <>
              <section>
                <h2>{this.state.selected.note.name}</h2>
                <p>{this.state.selected.note.modified}</p>
                <button>Delete Note</button>
              </section>
              <section>
                <p>{this.state.selected.note.content}</p>
              </section>
            </>
          ) : (
            <ul>
              {data["notes"].map((note) => (
                <>
                  <li>{note.name}</li>
                  <button>Delete Note</button>
                </>
              ))}
            </ul>
          )}
          <button>Add note</button>
        </main>
      </div>
    );
  }
}

export default App;
