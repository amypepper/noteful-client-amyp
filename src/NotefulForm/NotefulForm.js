import React from "react";
import "./NotefulForm.css";
import PropTypes from "prop-types";

export default function NotefulForm(props) {
  const { className, ...otherProps } = props;
  console.log("this is otherProps: ", otherProps);

  return (
    <form
      className={["Noteful-form", className].join(" ")}
      action="#"
      {...otherProps}
    />
  );
}

NotefulForm.propTypes = {
  className: PropTypes.string,
};
