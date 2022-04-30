import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../redux/cardSlice";
// import { doc } from "firebase/firestore";
import { FaImage, FaPalette } from "react-icons/fa";
import CustomBtn from "../../component/custom-btn/CustomBtn";
import CustomInput from "../../component/custom-input/CustomInut.component";
import { addUserGeneratedData } from "../../firebase/firebase.util";

import "./task-adder.styles.scss";

//initial states for the input fields
const initialStates = {
  title: "",
  subTitle: "",
  color: "",
  file: "",
  src: "",
};

const TaskAdder = () => {
  const [state, setState] = useState(initialStates);

  const { currentUser } = useSelector((state) => state.currentUser);
  // console.log(currentUser.uid);
  const dispatch = useDispatch();
  //destructure

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
      // src = data;
      // console.log(src);
    });
  };

  //   console.log(file, color);
  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      id: Math.random() * 1000 * new Date(),
      title,
      subTitle,
      color,
      file,
      src: src,
    };
    console.log(data);
    dispatch(addData(data));
    try {
      await addUserGeneratedData(currentUser.uid, data);
    } catch (err) {
      console.log(err.message);
    }
    //clear input fields
    setState(initialStates);
  };

  return (
    <div className="task-adder">
      <form onSubmit={submitHandler}>
        <CustomInput
          type="text"
          id="title"
          placeholder="Title"
          required
          name="title"
          className="title"
          value={title}
          handleChange={inputChangeHandler}
        />
        <div className="flex ">
          <CustomInput
            name="subTitle"
            value={subTitle}
            // onClick={expand}
            type="text"
            placeholder="Take a note..."
            id="fileid"
            handleChange={inputChangeHandler}
            required
          />

          <div className="task-menu">
            <div>
              {/* files */}
              <CustomInput
                id="file"
                type="file"
                name="file"
                hidden
                value={file}
                multiple
                accept=".jpg, .jpeg, .png"
                handleChange={(e) => {
                  inputChangeHandler(e);
                  fileReader(e);
                }}
              />
              <label className="file" htmlFor="file">
                <FaImage size={20} color="#555" />
                <span className="file-text">choose your img</span>
              </label>
              {/* colors */}
              <CustomInput
                type="color"
                id="color"
                name="color"
                hidden
                value={color}
                handleChange={inputChangeHandler}
              />
              <label htmlFor="color" className="label">
                <FaPalette size={20} color="#555" />
                <span className="label-text">choose fav color</span>
              </label>
            </div>
            <CustomBtn className="add-btn btn" type="submit">
              Add Task
              <span className="add-btn-text">add your tasks</span>
            </CustomBtn>
          </div>
          {/*  */}
        </div>
      </form>
    </div>
  );
};
export default TaskAdder;
