import React from "react";
import { createPortal } from "react-dom";
import CustomBtn from "../custom-btn/CustomBtn";
import CustomInput from "../custom-input/CustomInut.component";
import CustomForm from "../custom-form/CustomForm";
import "./delete-user.styles.scss";
import { useContext } from "react";
import UserContext from "../../context/user-context/user-context";
import useInput from "../../hooks/use-input";
import { auth } from "../../firebase/firebase.util";
import { deleteUser } from "firebase/auth";
import { AiOutlineCheckCircle } from "react-icons/ai";

const DeleteUser = () => {
  const {
    currentUser,
    deleteUserAcc,
    didUserDelete,
    setDeleteUserAcc,
    setDidUserDelete,
  } = useContext(UserContext);

  const userEmail = currentUser?.email;

  const {
    value: enterdValue,
    inputChangeHandler,
    vaildValue,
  } = useInput((value) => value === userEmail);

  const sumbitHanlder = async (e) => {
    e.preventDefault();
    if (!vaildValue) return;

    try {
      setDeleteUserAcc(true);
      setDidUserDelete(true);
      const res = await deleteUser(auth.currentUser);
      console.log(res);
    } catch (err) {
      console.log(err);
      setDidUserDelete(false);
    }
    setDeleteUserAcc(false);
  };
  const clearDelUserOverlay = () => {
    setDeleteUserAcc(false);
    setDidUserDelete(false);
  };

  const userDelSuccess = (
    <div className={`del-user-success `}>
      <div className={`${didUserDelete ? "animation-del-success" : ""}`}>
        <AiOutlineCheckCircle size={32} color={"#00810"} />
        <p>Your account deleted successfully...</p>
      </div>
      <CustomBtn handleChange={clearDelUserOverlay}>close</CustomBtn>
    </div>
  );
  return createPortal(
    <React.Fragment>
      {(deleteUserAcc || didUserDelete) && (
        <div
          className={`del-user-container  ${
            deleteUser ? "del-user-animation" : ""
          }`}
        >
          {deleteUserAcc && !didUserDelete && (
            <React.Fragment>
              <div className={`del-user`}>
                <div className="del-user-head">
                  <h3>Are you absolutely sure?</h3>
                  <CustomBtn
                    className="close-del-user"
                    handleChange={clearDelUserOverlay}
                  ></CustomBtn>
                </div>
                <div className="warning">
                  <p>
                    Unexpected bad things will happen if you don’t read this!
                  </p>
                </div>
                <div className="del-user-descrip">
                  <p>
                    This action cannot be undone. This will permanently delete
                    your account {userEmail} your saved data, comments, secrets,
                    photos and important notes.
                  </p>
                </div>
                <p className="confirm-text">
                  Please type <strong>{userEmail}</strong> to confirm
                </p>
                <CustomForm
                  className="del-user-form"
                  handleChange={sumbitHanlder}
                >
                  <CustomInput
                    type="text"
                    value={enterdValue}
                    handleChange={inputChangeHandler}
                  />
                  <CustomBtn disabled={!vaildValue} type="submit">
                    I undersand the consquences, delete the account
                  </CustomBtn>
                </CustomForm>
              </div>
              {/* overlay */}
            </React.Fragment>
          )}
          {didUserDelete && userDelSuccess}
        </div>
      )}
      {(deleteUserAcc || didUserDelete) && (
        <div className="del-overlay" onClick={clearDelUserOverlay}></div>
      )}
    </React.Fragment>,
    document.getElementById("delete-user")
  );
};
export default DeleteUser;
