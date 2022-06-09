import CustomForm from "../../component/custom-form/CustomForm";
import CustomInput from "../../component/custom-input/CustomInut.component";
import { useContext, useRef } from "react";
import "./re-auth.styles.scss";
import CustomBtn from "../../component/custom-btn/CustomBtn";
import { reAuthUser } from "../../firebase/firebase.util";
import UserContext from "../../context/user-context/user-context";

const ReAuth = () => {
  const { currentUser } = useContext(UserContext);
  const passwordRef = useRef();

  const submitHanlder = (event) => {
    event.preventDefault();
    const enteredPassword = passwordRef.current.value;
    if (!enteredPassword) return;
    reAuthUser(currentUser.email, enteredPassword, currentUser);
  };

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
              ref={passwordRef}
              required
            />
          </label>
          <CustomBtn type="submit">Submit</CustomBtn>
        </CustomForm>
      </div>
    </section>
  );
};
export default ReAuth;
