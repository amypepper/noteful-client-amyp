import React from "react";

class FolderError extends React.Component {
  // static componentDidCatch()

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Could not display this page.</h2>;
    }
    return this.props.children;
  }
}

export default FolderError;
