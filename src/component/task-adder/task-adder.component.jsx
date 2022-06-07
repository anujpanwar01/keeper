import { useContext, useEffect, useState } from "react";
import "./task-adder.styles.scss";
import { useNavigate } from "react-router-dom";
import CardContext from "../../context/card-context/card-context";
import UserContext from "../../context/user-context/user-context";
import { createPortal } from "react-dom";
import TaskInput from "../task-input/task-input.component";
import { database } from "../../firebase/firebase.util";
import { ref, push } from "firebase/database";
// import { uid } from "uid";
//initial states for the input fields

const initStates = {
  title: "",
  subTitle: "",
  color: "",
  file: "",
  src: "",
};
//  databaseReference.child(user.getUid()).push().setValue(markerInfo);

const TaskAdder = () => {
  //context

  const { isTaskOpen, setIsTaskOpen } = useContext(CardContext);
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [state, setState] = useState(initStates);

  const { title, subTitle, file, color, src } = state;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState(() => {
      return {
        ...state,
        [name]: value,
      };
    });
  };
  // let src;
  const fileReader = (e) => {
    const file = e.target.files[0];
    const render = new FileReader();
    render.readAsDataURL(file);

    render.addEventListener("load", function (e) {
      const data = e.target.result;
      setState(() => {
        return {
          ...state,
          src: data,
        };
      });
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please first do sign-in or sign-up. For save your process.");
      return navigate("/sign-up");
    } else {
      const data = {
        title,
        subTitle,
        color,
        file,
        src: src,
      };
      try {
        await push(ref(database, `notes/${currentUser?.uid}`), data);
      } catch (err) {
        alert(err.code);
      }

      //clear input fields
      setState(initStates);
    }
    setIsTaskOpen(false);
  };

  const taskOverlay = createPortal(
    <div
      className="task-overlay"
      onClick={() => {
        setIsTaskOpen(false);
      }}
    />,
    document.getElementById("task-overlay")
  );

  // for keyboard events
  (() =>
    (document.onkeydown = (e) => {
      if (e.key === "|") {
        document.getElementById("title").focus();
        setIsTaskOpen(true);
      } else if (e.key === "/") {
        document.getElementById("search").focus();
      }
    }))();

  return (
    <div className="task-adder">
      <form onSubmit={submitHandler}>
        <TaskInput
          onInputChangeHandler={inputChangeHandler}
          onFileReader={fileReader}
          {...state}
        />
      </form>
      {isTaskOpen && taskOverlay}
    </div>
  );
};
export default TaskAdder;
