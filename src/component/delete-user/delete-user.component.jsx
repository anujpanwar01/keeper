import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import CustomBtn from "../custom-btn/CustomBtn";
import CustomInput from "../custom-input/CustomInut.component";
import CustomForm from "../custom-form/CustomForm";
import "./delete-user.styles.scss";
import { useContext } from "react";
import UserContext from "../../context/user-context/user-context";
import useInput from "../../hooks/use-input";
import {
  auth,
  deleteUserCredential,
  deleteAllCard,
} from "../../firebase/firebase.util";
import { deleteUser } from "firebase/auth";
import { AiOutlineCheckCircle } from "react-icons/ai";
import CardContext from "../../context/card-context/card-context";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../loadin-Spinner/loading-Spinner.component";

const DeleteUser = () => {
  const inputRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const {
    currentUser,
    deleteUserAcc,
    didUserDelete,
    setDeleteUserAcc,
    setDidUserDelete,
  } = useContext(UserContext);
  const { deleteAll, setIsDeleting } = useContext(CardContext);

  console.log(isLoading);
  const userEmail = currentUser?.email;

  const {
    value: enterdValue,
    inputChangeHandler,
    vaildValue,
  } = useInput((value) => value === userEmail);

  const sumbitHanlder = async (e) => {
    e.preventDefault();
    if (!vaildValue) return;
    setIsLoading(true);
    try {
      setDeleteUserAcc(true);
      deleteAll([]);
      deleteAllCard(setIsDeleting);
      await deleteUserCredential(currentUser.uid);
      await deleteUser(currentUser);
      setIsLoading(false);
      setDidUserDelete(true);
    } catch (err) {
      //Firebase: Error (auth/requires-recent-login).
      if (err.code === "auth/requires-recent-login") {
        setDidUserDelete(false);
        setDeleteUserAcc(false);
        navigate("/re-auth");
      } else {
        alert(err.code);
      }
      setIsLoading(false);
    }
    setCopied(false);
  };
  const clearDelUserOverlay = () => {
    setDeleteUserAcc(false);
    setDidUserDelete(false);
    setCopied(false);
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
  const copyTextHandler = () => {
    inputRef.current.value = emailRef.current.innerText;
    inputRef.current.select();
    navigator.clipboard.writeText(inputRef.current.value);
    setCopied(true);
  };

  return createPortal(
    <React.Fragment>
      {(deleteUserAcc || didUserDelete) && (
        <div
          className={`del-user-container  ${
            deleteUser ? "del-user-animation" : ""
          }`}
        >
          {deleteUserAcc && !didUserDelete && (
            <>
              {isLoading && <LoadingSpinner />}
              {!isLoading && (
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
                        Unexpected bad things will happen if you don’t read
                        this!
                      </p>
                    </div>
                    <div className="del-user-descrip">
                      <p>
                        This action cannot be undone. This will permanently
                        delete your account {userEmail} your saved data,
                        comments, secrets, photos and important notes.
                      </p>
                    </div>
                    <div className="copy-text">
                      <button onClick={copyTextHandler}>
                        {copied ? "copied" : "copy"}
                      </button>
                      <p className="confirm-text">
                        Please type <strong ref={emailRef}>{userEmail}</strong>{" "}
                        to confirm
                      </p>
                      <input type={"text"} ref={inputRef} />
                    </div>
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
            </>
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
