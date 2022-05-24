import { useContext, useState } from "react";
import { addUserGeneratedData } from "../../firebase/firebase.util";
import "./task-adder.styles.scss";
import { useNavigate } from "react-router-dom";
import CardContext from "../../context/card-context/card-context";
import UserContext from "../../context/user-context/user-context";
import { createPortal } from "react-dom";
import TaskInput from "../task-input/task-input.component";

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
  const { addItem } = useContext(CardContext);
  const { isTaskOpen, setIsTaskOpen } = useContext(CardContext);
  const { currentUser } = useContext(UserContext);

  //state
  const navigate = useNavigate();
  const [state, setState] = useState(initStates);

  // const dispatch = useDispatch();

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
        id: Math.random() * 1000 * new Date(),
        title,
        subTitle,
        color,
        file,
        src: src,
      };
      addItem(data);
      try {
        await addUserGeneratedData(currentUser, data);
      } catch (err) {
        console.log(err.message);
      }
      //clear input fields
      setState(initStates);
    }
    setIsTaskOpen(false);
  };
  // fetch("https://keeper-app-7a3fe-default-rtdb.firebaseio.com/notes", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     note: {
  //       title,
  //       subTitle,
  //       color,
  //       file,
  //       src,
  //     },
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

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
      if (e.key === "t" || e.key === "T") {
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
