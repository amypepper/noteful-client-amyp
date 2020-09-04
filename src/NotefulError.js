import React from "react";

export default class NotefulError extends React.Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { error };
  }

  render() {
    if (this.state.error) {
      return <h2>Could not display this page. Try refreshing the page.</h2>;
    }
    return this.props.children;
  }
}
