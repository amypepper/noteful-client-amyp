import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import NoteDetails from "../NoteDetails/NoteDetails";

export default function NotePageMain(props) {
  return (
    <>
      <section>
        <p>{props.note.content}</p>
      </section>
      <section>
        <NoteDetails note={props.note} history={props.history} />
      </section>
      <Link to="/add-note">
        <button>Update Note</button>
      </Link>
    </>
  );
}

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
