import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../../firebase/firebase.util";
import CustomBtn from "../../component/custom-btn/CustomBtn";
import CustomForm from "../../component/custom-form/CustomForm";
import CustomInput from "../../component/custom-input/CustomInut.component";
import useInput from "../../hooks/use-input";

const ReAuth = () => {
  const submitHanlder = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <CustomForm handleChange={submitHanlder}>
        <p>Reauth</p>
        <CustomInput type="password" />
      </CustomForm>
    </div>
  );
};
export default ReAuth;
