import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addData } from "../../redux/cardSlice";
// import { doc } from "firebase/firestore";
import { FaImage, FaPlus, FaPalette } from "react-icons/fa";
import CustomBtn from "../../component/custom-btn/CustomBtn";
import CustomInput from "../../component/custom-input/CustomInut.component";
import { query } from "../../routes/home/Home";
// import Card from "../card/card.component";

import "./task-adder.styles.scss";

//initial states for the input fields
const initialStates = {
  title: "",
  subTitle: "",
  color: "",
  file: "",
};

const TaskAdder = () => {
  const [state, setState] = useState(initialStates);
  //   const tasks = useSelector((state) => state.card);
  //   console.log(tasks);
  const dispatch = useDispatch();
  //destructure

  const { title, subTitle, file, color } = state;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState(() => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  //   console.log(file, color);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addData({
        id: Math.random() * 1000 * new Date(),
        title,
        subTitle,
        color,
        file,
      })
    );
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
                handleChange={inputChangeHandler}
              />
              <label className="file" htmlFor="file">
                <FaImage size={20} color="#555" />
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
              </label>
            </div>
            <CustomBtn className="add-btn" type="submit">
              <FaPlus size={20} color="#555" />
            </CustomBtn>
          </div>
          {/*  */}
        </div>
      </form>
    </div>
  );
};
export default TaskAdder;
