import { useSelector } from "react-redux";

import Card from "../../component/card/card.component";
import "./Home.styles.scss";

import TaskAdder from "../../component/task-adder/task-adder.component";
/////////////////////////////////////////////////////
export const query = function (name1, name2, className) {
  return !className
    ? document.querySelector(`${name1}`).classList.add(`${name2}`) //if classname=undefined then run this
    : className === "toggle"
    ? document.querySelector(`${name1}`).classList.toggle(`${name2}`) //if classname=toggle then run this statement
    : document.querySelector(`${name1}`).classList.remove(`${name2}`); //if classname=remove then run this statement
};

//close the input field
// export const close = function (e) {
//   query(".overlay", "hidden-overlay", "toggle");
//   query("#title", "input-title", "remove");
//   query("#fileid", "input-width", "toggle");
//   query(".flex", "remove-flex", "toggle");
//   query(".add-btn", "abs-btn", "remove");
//   query(".file", "abs-file", "remove");
//   query(".label", "input-title", "remove");
//   query(".close", "close-taskbar", "toggle");
// };
// //open the input field
// export const expand = function () {
//   query(".label", "input-title");
//   query(".file", "abs-file");
//   query(".close", "close-taskbar");
//   query("#title", "input-title");
//   query("#fileid", "input-width");
//   query(".overlay", "hidden-overlay", "toggle");
//   query(".flex", "remove-flex");
//   query(".add-btn", "abs-btn");
// };
const Home = () => {
  const cardData = useSelector((state) => state.card);
  const { search } = useSelector((state) => state.search);
  const { grid } = useSelector((state) => state.theme);

  /////////////////////////////////////////////////
  return (
    <section className="home">
      <TaskAdder />

      <div
        className="card-list"
        style={
          grid
            ? { gridTemplateColumns: "1fr" }
            : { gridTemplateColumns: "repeat(4, 1fr)" }
        }
      >
        {cardData
          .filter((card) => card.title.toLowerCase().includes(search))
          .map((ele) => (
            <Card key={ele.id} {...ele} />
          ))}
      </div>
    </section>
  );
};

export default Home;
