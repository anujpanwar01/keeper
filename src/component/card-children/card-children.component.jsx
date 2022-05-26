import CustomBtn from "../custom-btn/CustomBtn";
import CardBtns from "../card-btns/card-btns.component";
import TextareaAutosize from "react-textarea-autosize";

const CardChildren = (props) => {
  return (
    <div
      className={`card-container ${props.grid ? "grid-1" : null} `}
      style={
        props.color
          ? { backgroundColor: props.color }
          : { backgroundColor: "#fff390" }
      }
    >
      <form onSubmit={props.submitHandler}>
        <div
          className={`card`}
          style={
            props.src || props.file ? { height: "100%" } : { height: "28rem" }
          }
        >
          {(props.src || props.file) && (
            <div className="image">
              <img
                src={props.src}
                style={{ width: "100%" }}
                className="card-image"
                alt="img"
              />
            </div>
          )}

          {(!props.src || props.read) && (
            <div className="card-text">
              <textarea
                className="title"
                value={props.inputValue.title}
                name="title"
                style={
                  props.isEdit
                    ? { background: "white", border: "1px solid black" }
                    : { background: "inherit", border: "none" }
                }
                onChange={props.inputChangeHandler}
                disabled={!props.isEdit ? true : false}
              />
              <TextareaAutosize
                className="sub-Title"
                name="subTitle"
                value={props.inputValue.subTitle}
                onChange={props.inputChangeHandler}
                style={
                  props.isEdit
                    ? { background: "white", border: "1px solid black" }
                    : { background: "inherit" }
                }
                disabled={!props.isEdit ? true : false}
              />

              {props.read && props.src && (
                <div className="read-me close-read">
                  <CustomBtn
                    className="close-read-me"
                    handleChange={props.closeText}
                  >
                    Close me &uarr;
                  </CustomBtn>
                  <span />
                </div>
              )}
            </div>
          )}

          {props.src && !props.read && (
            <div className="read-me">
              <CustomBtn className="read-me-btn" handleChange={props.openText}>
                Read me &darr;
              </CustomBtn>
              <span />
            </div>
          )}
        </div>
        {
          <CardBtns
            onIsCardEdit={props.isCardEdit}
            edit={props.isEdit}
            onHandleDelete={props.handleDelete}
            onHandleSave={props.handleSave}
          />
        }
      </form>
    </div>
  );
};

export default CardChildren;
