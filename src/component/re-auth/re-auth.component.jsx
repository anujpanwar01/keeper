import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../../firebase/firebase.util";
import CustomBtn from "../custom-btn/CustomBtn";
import CustomForm from "../custom-form/CustomForm";
import CustomInput from "../custom-input/CustomInut.component";
import useInput from "../../hooks/use-input";

const onReaAuth = () => {
  const reauthUserForDel = () => {
    const passowrd = "from user input";
    const { currentUser } = auth;
    const { email } = auth.currentUser;
    const credential = EmailAuthProvider.credential(email, passowrd);

    reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        console.log("done");
      })
      .then()
      .catch((err) => console.log(err));
  };

  return <div></div>;
};
