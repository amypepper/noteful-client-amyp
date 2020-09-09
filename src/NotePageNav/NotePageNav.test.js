import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import NotePageNav from "./NotePageNav";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <NotePageNav />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// describe(`NotePageNav component`, () => {
//   it('renders a .NotePageNav by default', () => {
//     const wrapper = shallow(<NotePageNav />)
//     expect(toJson(wrapper)).toMatchSnapshot()
//   })

//   // enzyme doesn't support React.createContext
//   it.skip('renders a h3 with folder name when in props', () => {
//     const props = {
//       match: {
//         params: {
//           noteId: 'test-note-id'
//         }
//       }
//     }
//     const context = {
//       notes: [{ id: 'test-note-id', folderId: 'test-folder-id' }],
//       folders: [{ id: 'test-folder-id', name: 'Important' }]
//     }

//     const h3 = shallow(<NotePageNav {...props} />, context)
//       .find('.NotePageNav__folder-name')
//     expect(toJson(h3)).toMatchSnapshot()
//   })
// })
