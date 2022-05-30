import { useContext, useEffect, useState } from "react";
import "./task-adder.styles.scss";
import { useNavigate } from "react-router-dom";
import CardContext from "../../context/card-context/card-context";
import UserContext from "../../context/user-context/user-context";
import { createPortal } from "react-dom";
import TaskInput from "../task-input/task-input.component";
import { database } from "../../firebase/firebase.util";
import { ref, set, onValue, push, child } from "firebase/database";
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
  let d = [];
  //context
  const { addItem } = useContext(CardContext);
  const { isTaskOpen, setIsTaskOpen } = useContext(CardContext);
  const { currentUser } = useContext(UserContext);
  const [a, setA] = useState([]);

  // const noteUid = uid();
  const notesRef = ref(database, `notes/ ${currentUser?.uid}`);

  // console.log(a, currentUser.uid);
  //state
  const navigate = useNavigate();
  const [state, setState] = useState(initStates);
  // const data = [];
  // const dispatch = useDispatch();
  useEffect(() => {
    onValue(notesRef, (snapshot) => {
      setA([]);
      console.log(snapshot.exists());
      const { notes } = snapshot.val();

      if (!notes) return;
      // Object.values(notes).map((note) => {
      //   console.log(note);
      //   return setA((pre) => [...pre, note]);
      // });

      // for (const note in notes) {
      //   const d = {
      //     id: note,
      // console.log(a);
      //   };

      let transformData = {};
      Object.values(notes).map((key) => {
        console.log(key);
        for (const note in key) {
          console.log(note, key);
          // console.log(key[note].subTitle, note);
          transformData.id = note;
          transformData.title = key[note].title;
          transformData.color = key[note].color;
          transformData.file = key[note].file;
          transformData.src = key[note].src;
          transformData.subTitle = key[note].subTitle;

          //   // const transformData = {
          //   //   id: note,
          //   //   title: key[note].data.title,
          //   //   color: key[note].data.color,
          //   //   file: key[note].data.file,
          //   //   src: key[note].data.src,
          //   //   subTitle: key[note].data.subTitle,
          //   // };
          //   // d.push(transformData);
        }
        return setA((prev) => [...prev, transformData]);
        // return d;
        // console.log(Object.values(key).map((ele) => ele));
      });
      // console.log(a, d);

      // console.log({ color: notes[note].color });
      // const d = {
      //   id: note,
      //   color: notes[note].data.color,
      //   file: notes[note].data.file,
      //   src: notes[note].data.src,
      //   subTitle: notes[note].data.subTitle,
      //   title: notes[note].data.title,
      // };
      // }

      //   // data.push(d);
      //   addItem(d);
      // }
    });
  }, []);
  console.log(a, d);
  // console.log(data);

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

  const submitHandler = (e) => {
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
      // set note to firebase
      const newNotesRef = push(notesRef);
      set(newNotesRef, data);

      // try {
      //   await addUserGeneratedData(currentUser, { data });
      // } catch (err) {
      //   console.log(err.message);
      // }
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
