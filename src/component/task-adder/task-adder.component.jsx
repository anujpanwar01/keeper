import { useContext, useState } from "react";
import "./task-adder.styles.scss";
import { useNavigate } from "react-router-dom";
import CardContext from "../../context/card-context/card-context";
import UserContext from "../../context/user-context/user-context";
import { createPortal } from "react-dom";
import TaskInput from "../task-input/task-input.component";
import { database } from "../../firebase/firebase.util";
import { ref, push } from "firebase/database";
import LoadingSpinner from "../loadin-Spinner/loading-Spinner.component";
// import { uid } from "uid";
//initial states for the input fields

const initStates = {
  title: "",
  subTitle: "",
  color: "",
  file: "",
  src: "",
};

const TaskAdder = () => {
  //context

  const { isTaskOpen, isCreating, setIsTaskOpen, setIsCreating } =
    useContext(CardContext);
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [state, setState] = useState(initStates);
  // const [isCreating, setIsCreating] = useState(false);

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
    setIsCreating(true);

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
        setIsCreating(false);
      } catch (err) {
        setIsCreating(false);
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
    <>
      {isCreating && <LoadingSpinner />}
      {!isCreating && (
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
      )}
    </>
  );
};
export default TaskAdder;
