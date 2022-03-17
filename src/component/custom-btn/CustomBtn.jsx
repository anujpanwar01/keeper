import React from "react";

const CustomBtn = function ({ handleChange, children, ...otherProps }) {
  return (
    <button onClick={handleChange} {...otherProps}>
      {children}
    </button>
  );
};

export default CustomBtn;
