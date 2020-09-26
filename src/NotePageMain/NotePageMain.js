import React from "react";
import PropTypes from "prop-types";

import NoteDetails from "../NoteDetails/NoteDetails";

export default function NotePageMain(props) {
  return (
    <>
      <section>
        <NoteDetails note={props.note} history={props.history} />
      </section>
      <section>
        <p>{props.note.content}</p>
      </section>
    </>
  );
}

// NotePageMain.defaultProps = {
//   note: {
//     content: "",
//   },
//   history: {},
// };

NotePageMain.propTypes = {
  note: PropTypes.shape({
    folder_id: PropTypes.number,
    id: PropTypes.number,
    modified: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  history: PropTypes.object.isRequired,
};
