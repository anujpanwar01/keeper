import React, { useContext } from "react";
import CardContext from "../../context/card-context/card-context";
import CustomInput from "../custom-input/CustomInut.component";
import CustomBtn from "../custom-btn/CustomBtn";
import TaskMenu from "../task-menu/taks-menu";
import "./task-input.styles.scss";

const TaskInput = ({
  title,
  subTitle,
  color,
  file,
  onInputChangeHandler,
  onFileReader,
}) => {
  const { isTaskOpen, setIsTaskOpen } = useContext(CardContext);

  return (
    <React.Fragment>
      <CustomInput
        type="text"
        id="title"
        placeholder="Title"
        required
        name="title"
        style={
          !isTaskOpen
            ? { borderRadius: "0.5rem" }
            : { borderTopRightRadius: "0.5rem", borderTopLeftRadius: "0.5rem" }
        }
        className="title"
        value={title}
        handleChange={onInputChangeHandler}
        onClick={() => setIsTaskOpen(true)}
      />
      {!isTaskOpen && (
        <CustomBtn
          type="button"
          className={"open-task-btn"}
          handleChange={() => {
            setIsTaskOpen(true);
          }}
        >
          +
        </CustomBtn>
      )}
      {!isTaskOpen && (
        <label htmlFor="title" className="task-key">
          |
          <span>
            press <strong>|</strong> to direct jump to task-adder
          </span>
        </label>
      )}
      {isTaskOpen && (
        <div className="flex ">
          <CustomInput
            name="subTitle"
            value={subTitle}
            type="text"
            placeholder="Take a note..."
            id="fileid"
            handleChange={onInputChangeHandler}
            required
          />
          <TaskMenu
            color={color}
            file={file}
            onInputChangeHandler={onInputChangeHandler}
            onFileReader={onFileReader}
          />
        </div>
      )}
    </React.Fragment>
  );
};
export default TaskInput;
