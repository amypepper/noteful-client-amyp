import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import NoteListMain from "../NoteListMain/NoteListMain";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageMain from "../NotePageMain/NotePageMain";
import NotePageNav from "../NotePageNav/NotePageNav";

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
            <NotePageNav {...this.state} />
          ) : (
            <NoteListNav />
          )}
        </nav>
        <main>
          {this.state.noteView ? (
            <NotePageMain {...this.state} />
          ) : (
            <NoteListMain />
          )}
          <button>Add note</button>
        </main>
      </div>
    );
  }
}

export default App;
