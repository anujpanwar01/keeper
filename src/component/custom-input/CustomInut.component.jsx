import React from "react";

const CustomInput = ({ handleChange, ...otherProps }) => {
  return <input onChange={handleChange} {...otherProps} />;
};
export default CustomInput;
