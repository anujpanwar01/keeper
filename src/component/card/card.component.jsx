import { useSelector, useDispatch } from "react-redux";
import { delCard, editCard } from "../../redux/cardSlice";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import CustomBtn from "../custom-btn/CustomBtn";
import "./card.styles.scss";

const Card = function (ele) {
  const dispatch = useDispatch();
  const { title, subTitle, file, color, src } = ele;
  const { grid } = useSelector((state) => state.theme);
  const { edit } = useSelector((state) => state.card);

  const handleDelete = () => {
    dispatch(delCard({ id: ele.id }));
  };
  const handleCardEdit = () => {
    dispatch(editCard({ id: ele.id }));
  };
  return (
    <div
      className={`card ${grid ? "grid-1" : null} ${edit && "out-of-flow"}`}
      style={
        color ? { backgroundColor: color } : { backgroundColor: "#fff390" }
      }
    >
      {src ? (
        <div
          className="image"
          style={{
            backgroundImage: `url(${file})`,
          }}
        >
          <img
            src={src}
            style={{ width: "100%" }}
            className="card-image"
            alt="img"
          />
        </div>
      ) : null}
      <h2 className="card-title">{title}</h2>
      <p className="card-subTitle">{subTitle}</p>
      <div className="btn-container">
        <CustomBtn className={`edit-btn `} handleChange={handleCardEdit}>
          <AiFillEdit size={20} />
          <span className="edit-btn-text">Edit The Note</span>
        </CustomBtn>

        <CustomBtn className="del-btn" handleChange={handleDelete}>
          <FaTrash size={20} />
          <span className="del-btn-text">Delete The Note</span>
        </CustomBtn>
      </div>
    </div>
  );
};
export default Card;
