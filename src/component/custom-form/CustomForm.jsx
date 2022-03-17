import React from "react";

const CustomForm = ({ handleChange, children, ...otherProps }) => {
  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleChange}
      {...otherProps}
    >
      {children}
    </form>
  );
};

export default CustomForm;
