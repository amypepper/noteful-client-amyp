import React from "react";
import PropTypes from "prop-types";

class ErrorTest extends React.Component {
  render() {
    const money = new Intl.NumberFormat(this.props.locale, {
      style: "currency",
      currency: this.props.currency,
    }).format(this.props.value);

    return (
      <div className="currency">
        Win this much in the lottery ({money}) by visiting {this.props.url}
      </div>
    );
  }
}
export default ErrorTest;

ErrorTest.propTypes = {
  value: (props, propName, componentName) => {
    console.log(PropTypes);
    // first get the value of the prop
    const prop = props[propName];

    // since we want to make this required let us check that first
    if (!prop) {
      return new Error(
        `${propName} is required in ${componentName}. Validation Failed`
      );
    }

    // the prop has a value let's check the type
    if (typeof prop != "number") {
      return new Error(
        `Invalid prop, ${propName} is expected to be a number in ${componentName}. ${typeof prop} found.`
      );
    }

    // the prop is a number let us check the range
    if (prop < 1 || prop > 1000000) {
      return new Error(
        `Invalid prop, ${propName} should be in range 1 - 1,000,000 in ${componentName}. ${prop} found.`
      );
    }
  },
  url: (props, propName, componentName) => {
    // get the value of the prop
    const prop = props[propName];

    // do the isRequired check
    if (!prop) {
      return new Error(
        `${propName} is required in ${componentName}. Validation Failed`
      );
    }

    // check the type
    if (typeof prop != "string") {
      return new Error(
        `Invalid prop, ${propName} is expected to be a string in ${componentName}. ${typeof prop} found.`
      );
    }

    // do the custom check here
    // using a simple regex
    if (prop.length < 5 || !prop.match(new RegExp(/^https?:\/\/\w+\.\w+/))) {
      return new Error(
        `Invalid prop, ${propName} must be min length 5 and begin 'http(s)://'. Validation Failed.`
      );
    }
  },
};

// ErrorTest.defaultProps = {
//   locale: "",
//   currency: "",
//   value: null,
// };
