import CustomBtn from "../custom-btn/CustomBtn";
import { FaTrash } from "react-icons/fa";

const DeleteButton = function ({ handleChange, className }) {
  return (
    <CustomBtn className={`del-btn ${className}`} handleChange={handleChange}>
      <FaTrash size={20} />
      <span className="del-btn-text">Delete The Note</span>
    </CustomBtn>
  );
};

export default DeleteButton;
