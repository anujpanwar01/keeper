import React from "react";
import "./custom-btn.styles.scss";
const CustomBtn = function ({ handleChange, children, ...otherProps }) {
  return (
    <button onClick={handleChange} {...otherProps}>
      {children}
    </button>
  );
};

export default CustomBtn;
