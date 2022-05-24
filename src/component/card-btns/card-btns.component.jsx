import { AiFillEdit } from "react-icons/ai";
import CustomBtn from "../custom-btn/CustomBtn";
import DeleteButton from "../delete-btn/delete-btn.component";
import "./card-btns.styles.scss";

const CardBtns = (props) => {
  return (
    <div className="btn-container">
      <CustomBtn
        className={`edit-btn `}
        type="button"
        handleChange={props.onIsCardEdit}
      >
        <AiFillEdit size={20} />
        <span className="edit-btn-text">Edit The Note</span>
      </CustomBtn>

      {!props.edit && <DeleteButton handleChange={props.onHandleDelete} />}

      {props.edit && (
        <CustomBtn
          className="save-btn"
          type="submit"
          handleChange={props.onHandleSave}
        >
          save
        </CustomBtn>
      )}
    </div>
  );
};

export default CardBtns;
