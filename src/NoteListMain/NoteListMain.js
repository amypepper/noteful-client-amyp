import React from "react";
import data from "../dummy-store";

import NoteDetails from "../NoteDetails/NoteDetails";

export default class NoteListMain extends React.Component {
  render() {
    return (
      <ul>
        {this.props.notes.map((note, i) => (
          <NoteDetails note={note} key={i} />
        ))}
        <button>Add Note</button>
      </ul>
    );
  }
}

// if (this.props.match.params.folderId) {
//   const filteredNotes = this.filterNotes(this.props.match.params.folderid);
//   return (
//     <ul>
//       {filteredNotes.map((note, i) => (
//         <NoteDetails note={note} key={i} />
//       ))}
//       <button>Add Note</button>
//     </ul>
//   );
// }
// return this.props.notes.map((note, i) => (
//   <li>
//     <NoteDetails note={note} key={i} />
//   </li>
// ));
