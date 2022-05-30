import { useState } from "react";

const useInput = (validate) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  // console.log(validate(enteredValue));

  const hasError = !validate(enteredValue) && isTouched;
  const vaildValue = validate(enteredValue);
  const inputChangeHandler = (e) => {
    setIsTouched(false);
    setEnteredValue(e.target.value);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    vaildValue,
    hasError,
    inputBlurHandler,
    inputChangeHandler,
    reset,
  };
};
export default useInput;
