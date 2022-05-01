import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delCard, editCard, saveEditedValue } from "../../redux/cardSlice";

import { AiFillEdit } from "react-icons/ai";
import CustomBtn from "../custom-btn/CustomBtn";
import "./card.styles.scss";
import DeleteButton from "../delete-btn/delete-btn.component";

const Card = function (ele) {
  const dispatch = useDispatch();
  const { title, subTitle, file, color, src } = ele;
  const { grid } = useSelector((state) => state.theme);
  const { edit } = useSelector((state) => state.card);

  const handleDelete = () => {
    dispatch(delCard({ id: ele.id }));
  };

  //////////////////////////////////////////
  const editCommonCode = (e, add = undefined) => {
    const cardEdit = e.currentTarget.closest(".card");

    const childrens = new Array(...cardEdit.children);

    childrens.forEach((ele) => {
      if (
        ele.classList.contains("card-title") ||
        ele.classList.contains("card-subTitle")
      ) {
        if (add) {
          ele.setAttribute("contenteditable", true);

          // for set the focus onto ele
          const range = document.createRange();
          const selection = window.getSelection();
          selection.removeAllRanges();
          range.selectNodeContents(ele);
          range.collapse(false);
          selection.addRange(range);
          ele.focus();
        } else {
          ele.removeAttribute("contenteditable", true);
        }
      }
    });

    return { childrens, cardEdit };
  };

  const handleCardEdit = (e) => {
    const { cardEdit } = editCommonCode(e, "add");

    cardEdit.classList.add("out-of-flow");

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    dispatch(editCard(true));
  };

  const handleSave = function (e) {
    const { cardEdit, childrens } = editCommonCode(e, undefined);

    console.log(childrens);
    cardEdit.classList.remove("out-of-flow");

    let title;
    let subTitle;

    document.body.style.overflow = "visible";

    childrens.forEach((ele) => {
      if (ele.classList.contains("card-title")) title = ele.innerText;
      else if (ele.classList.contains("card-subTitle"))
        subTitle = ele.innerText;
    });

    dispatch(saveEditedValue({ id: ele.id, title, subTitle }));
    dispatch(editCard(false));
  };
  ////////////////////////////////////////////////

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
        <CustomBtn className={`edit-btn `} handleChange={handleCardEdit}>
          <AiFillEdit size={20} />
          <span className="edit-btn-text">Edit The Note</span>
        </CustomBtn>

        {!edit && <DeleteButton handleChange={handleDelete} />}

        {edit && (
          <CustomBtn className="save-btn" handleChange={handleSave}>
            save
          </CustomBtn>
        )}
      </div>
    </div>
  );
};
export default Card;
