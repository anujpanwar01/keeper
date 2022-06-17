import CustomForm from "../../component/custom-form/CustomForm";
import CustomInput from "../../component/custom-input/CustomInut.component";
import { useContext } from "react";
import "./re-auth.styles.scss";
import CustomBtn from "../../component/custom-btn/CustomBtn";

import { reAuthUser, resetPassword } from "../../firebase/firebase.util";
import UserContext from "../../context/user-context/user-context";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";
const ReAuth = () => {
  const navigate = useNavigate();
  const {
    value: enteredPassword,
    hasError: passwordHasError,
    vaildValue: passwordIsValid,
    inputBlurHandler: passwordBlurHanlder,
    inputChangeHandler: passwordChangeHandler,
  } = useInput((value) => value.trim().length > 5);

  const { currentUser } = useContext(UserContext);

  const submitHanlder = (event) => {
    event.preventDefault();

    if (!passwordIsValid) {
      passwordBlurHanlder();
      return;
    }

    reAuthUser(currentUser?.email, enteredPassword, currentUser);
    alert("Please now try again to delete your account...");
    navigate("/");
  };

  const resetUserPassword = async () => await resetPassword(currentUser?.email);

  return (
    <section className="re-auth">
      <div>
        <h3>Enter Your Password</h3>
        <CustomForm handleChange={submitHanlder}>
          <label htmlFor="password">
            Password
            <CustomInput
              id="password"
              type="password"
              value={enteredPassword}
              handleChange={passwordChangeHandler}
              onBlur={passwordBlurHanlder}
            />
          </label>
          {passwordHasError && (
            <p className="error-text">
              Password length must be greater then 6.
            </p>
          )}
          <CustomBtn type="submit">Submit</CustomBtn>
        </CustomForm>
        <CustomBtn className="reset-pass" onClick={resetUserPassword}>
          reset password
        </CustomBtn>
      </div>
    </section>
  );
};
export default ReAuth;
