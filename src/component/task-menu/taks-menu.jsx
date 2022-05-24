import CustomInput from "../custom-input/CustomInut.component";
import CustomBtn from "../custom-btn/CustomBtn";
import { FaImage, FaPalette } from "react-icons/fa";
import "./task-menu.styles.scss";
import { useContext } from "react";

import CardContext from "../../context/card-context/card-context";

const TaskMenu = ({ file, color, onInputChangeHandler, onFileReader }) => {
  const { setIsTaskOpen } = useContext(CardContext);

  const handleTaskAdder = () => setIsTaskOpen(false);

  return (
    <div className="task-menu">
      <div>
        <CustomInput
          id="file"
          type="file"
          name="file"
          hidden
          value={file}
          multiple
          accept=".jpg, .jpeg, .png"
          handleChange={(e) => {
            onInputChangeHandler(e);
            onFileReader(e);
          }}
        />
        <label className="file" htmlFor="file">
          <FaImage size={20} color="#555" />
          <span className="file-text">choose your img</span>
        </label>
        <CustomInput
          type="color"
          id="color"
          name="color"
          hidden
          value={color}
          handleChange={onInputChangeHandler}
        />
        <label htmlFor="color" className="label">
          <FaPalette size={20} color="#555" />
          <span className="label-text">choose fav color</span>
        </label>
      </div>
      <CustomBtn className="add-btn btn" type="submit">
        Add Task
      </CustomBtn>
      <CustomBtn
        type="button"
        className={"close-task-adder"}
        handleChange={handleTaskAdder}
      >
        X
      </CustomBtn>
    </div>
  );
};
export default TaskMenu;
