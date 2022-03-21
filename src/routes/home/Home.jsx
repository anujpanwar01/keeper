import TaskAdder from "../../component/task-adder/task-adder.component";
import "./Home.styles.scss";

//for the classes
export const query = function (name1, name2, className) {
  return !className
    ? document.querySelector(`${name1}`).classList.add(`${name2}`) //if classname=undefined then run this
    : className === "toggle"
    ? document.querySelector(`${name1}`).classList.toggle(`${name2}`) //if classname=toggle then run this statement
    : document.querySelector(`${name1}`).classList.remove(`${name2}`); //if classname=remove then run this statement
};

export const close = function (e) {
  query(".overlay", "hidden-overlay", "toggle");
  query("#title", "input-title", "remove");
  query("#fileid", "input-width", "toggle");
  query(".flex", "remove-flex", "toggle");
  query(".add-btn", "abs-btn", "remove");
  query(".file", "abs-file", "remove");
  query(".label", "input-title", "remove");
  query(".close", "close-taskbar", "toggle");
};
const Home = () => {
  /////////////////////////////////////////////////
  //   const [value, setValue] = useState({
  //     file: "",
  //   });

  // const overlay = function (e) {
  //   query(".overlay", "hidden-overlay", "toggle");
  //   query("#title", "input-title", "remove");
  //   query("#fileid", "input-width", "toggle");
  //   query(".flex", "remove-flex", "toggle");
  //   query(".add-btn", "abs-btn", "remove");
  //   query(".file", "abs-file", "remove");
  //   query(".label", "input-title", "remove");
  //   query(".close", "close-taskbar", "toggle");
  // };
  // const close = function () {
  //   query(".file", "abs-file", "remove");
  //   query(".label", "input-title", "remove");
  //   query(".close", "close-taskbar", "toggle");
  //   query("#title", "input-title", "remove");
  //   query("#fileid", "input-width", "remove");
  //   query(".overlay", "hidden-overlay", "toggle");
  //   query(".flex", "remove-flex", "remove");
  //   query(".add-btn", "abs-btn", "remove");
  // };
  /////////////////////////////////////////////////
  return (
    <section className="home">
      <TaskAdder />
      <div
        onClick={close}
        className="overlay hidden-overlay"
        style={{
          position: "absolute",
          height: "100vh",
          width: "100%",
          zIndex: "1",
          top: "0",
        }}
      ></div>
    </section>
  );
};
export default Home;
