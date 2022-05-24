import React from "react";

const CustomInput = React.forwardRef(({ handleChange, ...otherProps }, ref) => {
  return <input ref={ref} onChange={handleChange} {...otherProps} />;
});
export default CustomInput;
