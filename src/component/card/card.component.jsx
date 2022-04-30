import { useEffect } from "react";
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

  const handleCardEdit = (e) => {
    const cardEdit = e.currentTarget.closest(".card");

    cardEdit.classList.add("out-of-flow");
    cardEdit.setAttribute("contenteditable", true);
    cardEdit.focus();

    dispatch(editCard(true));
  };

  const handleSave = function (e) {
    const cardEdit = e.currentTarget.closest(".card");

    cardEdit.removeAttribute("contenteditable");

    cardEdit.classList.remove("out-of-flow");

    cardEdit.blur(); //remove the focus

    dispatch(editCard(false));
  };

  /////////////////////////////
  useEffect(() => {
    // if user the refresh page between editing section
    // to remove overlay this is imporatant

    window.onload = function () {
      dispatch(editCard(false));
    };
  });
  /////////////////////////////

  return (
    <div
      className={`card ${grid ? "grid-1" : null} `}
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
        <CustomBtn
          className={`edit-btn `}
          handleChange={handleCardEdit}
          suppressContentEditableWarning="false"
        >
          <AiFillEdit size={20} />
          <span className="edit-btn-text">Edit The Note</span>
        </CustomBtn>

        {!edit && (
          <CustomBtn
            className="del-btn"
            handleChange={handleDelete}
            suppressContentEditableWarning="false"
          >
            <FaTrash size={20} />
            <span className="del-btn-text">Delete The Note</span>
          </CustomBtn>
        )}

        {edit && (
          <CustomBtn
            className="save-btn"
            handleChange={handleSave}
            suppressContentEditableWarning="false"
          >
            save
            {/* <AiFillSave size={20} />
            <span className="save-btn-text">Save your Edit</span> */}
          </CustomBtn>
        )}
      </div>
    </div>
  );
};
export default Card;
