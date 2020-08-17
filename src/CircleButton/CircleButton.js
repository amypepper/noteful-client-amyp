import React from "react";
import "./CircleButton.css";
import PropTypes from "prop-types";

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props;

  return React.createElement(
    tag,
    {
      className: ["NavCircleButton", className].join(" "),
      ...otherProps,
    },
    children
  );
}

NavCircleButton.propTypes = {
  className: PropTypes.string,
};
NavCircleButton.defaultProps = {
  tag: "a",
};
