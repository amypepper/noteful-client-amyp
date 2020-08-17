import React from "react";

import ApiContext from "../ApiContext";
import config from "../config";
import ValidationError from "../ValidationError";

export default class AddFolder extends React.Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.state = {
      folder: {
        value: "",
        touched: false,
      },
    };
  }

  updateFolder(folderName) {
    this.setState({
      folder: { value: folderName, touched: true },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { folder } = this.state;
    const newFolderObj = {
      name: folder.value,
    };
    const postOption = {
      method: "POST",
      body: JSON.stringify(newFolderObj),
    };

    fetch(`${config.API_ENDPOINT}/folders`, postOption)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((data) => {
        const newFolderWithId = {
          id: `${data.id}-ffaf-11e8-8eb2-f2801f1b9fd1`,
          ...newFolderObj,
        };
        console.log("the post request works?? ", newFolderWithId);
        this.setState({
          folder: { value: "", touched: false },
        });
        this.context.AddFolder(newFolderWithId);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  };

  validateFolderName() {
    const folderName = this.state.folder.value.trim();
    if (folderName.length === 0) {
      return "Name is required";
    } else if (folderName.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  render() {
    console.log(ApiContext);
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <label htmlFor="folder">New Folder Name</label>
          <input
            type="text"
            name="folder"
            id="folder"
            ref={this.nameInput}
            value={this.state.folder.value}
            onChange={(e) => this.updateFolder(e.target.value)}
          />
          {this.state.folder.touched && (
            <ValidationError message={this.validateFolderName()} />
          )}
        </fieldset>
        <fieldset className="button__group">
          <button type="reset" className="button">
            Cancel
          </button>
          <button
            type="submit"
            className="button"
            disabled={this.validateFolderName()}
          >
            Save
          </button>
        </fieldset>
      </form>
    );
  }
}
