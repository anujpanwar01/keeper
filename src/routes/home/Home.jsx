import { useContext, useEffect, useState, useCallback } from "react";
import Card from "../../component/card/card.component";
import TogglerContext from "../../context/toggler-context/toggler-context";
import TaskAdder from "../../component/task-adder/task-adder.component";
import CustomBtn from "../../component/custom-btn/CustomBtn";
import CardContext from "../../context/card-context/card-context";
import "./Home.styles.scss";
import Overlay from "../../component/overlay/overlay.component";

const Home = () => {
  console.log("home");
  const { items, isEdit, deleteAll, editItem } = useContext(CardContext);
  const { grid, searchValue, theme } = useContext(TogglerContext);
  const [toolTip, setToolTip] = useState(true);

  ///////////////////////////////////////////////////////

  //Tool-tip
  const toolTipHandler = useCallback(() => {
    items.length > 0 &&
      items.length < 2 &&
      setTimeout(() => {
        document
          .querySelector(".tool__tip")
          .classList.remove("close__tool--tip");
        setToolTip(false);
      }, 6000);
  }, [items]);

  const closeTooltip = () => {
    setToolTip(false);
  };

  useEffect(() => {
    toolTipHandler();
  }, [toolTipHandler]);

  const toolTipContent = (
    <p
      className={`tool__tip ${
        items.length === 1 && toolTip ? "close__tool--tip" : ""
      } hidden__tool--tip `}
    >
      Press <span>/</span> to direct jump into search box.{" "}
      <CustomBtn className="tool__tip--btn" onClick={closeTooltip}>
        X
      </CustomBtn>
    </p>
  );

  // tool-tip
  /////////////////////////////////////////////////////////////////////////////////////
  const clearAllElement = () => {
    deleteAll([]);
  };

  let content = (
    <>
      <p className={`empty-content ${!theme ? "bb-empty-content" : ""}`}>
        No Task added yet...
      </p>
      <p
        className={`empty-content ${!theme ? "bb-empty-content" : ""}`}
        style={{
          fontSize: "1.8rem",
          padding: "2rem",
        }}
      >
        Press <strong>T or t</strong> to direct jump into Task bar...{" "}
      </p>
    </>
  );
  // if one items added then paragraph will be removed
  if (items.length > 0) {
    content = (
      <div
        className="card-list"
        style={
          grid
            ? { gridTemplateColumns: "1fr" }
            : { gridTemplateColumns: "repeat(4, 1fr)" }
        }
      >
        {items
          .filter((card) =>
            card.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((ele) => (
            <Card key={ele.id} {...ele} />
          ))}
      </div>
    );
  }
  //overlay onclick
  const overlayHandler = () => {
    editItem(false);
    document.body.style.overflowY = "visible";
    document.querySelectorAll(".card-container").forEach((ele) => {
      ele.scrollTo(0, 0);
      ele.classList.remove("out-of-flow");
    });
    document
      .querySelectorAll(".sub-Title")
      .forEach((ele) => (ele.style.overflow = "hidden"));
  };
  /////////////////////////////////////////////////
  return (
    <section className="home">
      <TaskAdder />
      {content}
      {toolTipContent}

      {items.length >= 1 && (
        <CustomBtn className="btn clear-all-btn" onClick={clearAllElement}>
          Clear All
        </CustomBtn>
      )}
      {/* overlay for profile */}
      {isEdit && (
        <Overlay
          target={"overlay"}
          className="overlay"
          onClick={overlayHandler}
        />
      )}
    </section>
  );
};

export default Home;
