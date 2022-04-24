import { useDispatch, useSelector } from "react-redux";
import { resetAll } from "../../redux/cardSlice";
import Card from "../../component/card/card.component";
import "./Home.styles.scss";

import TaskAdder from "../../component/task-adder/task-adder.component";
import CustomBtn from "../../component/custom-btn/CustomBtn";

const Home = () => {
  const { store } = useSelector((state) => state.card);
  const { search } = useSelector((state) => state.search);
  const { grid } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const clearAllElement = () => {
    dispatch(resetAll());
  };
  // console.log(store);
  /////////////////////////////////////////////////
  return (
    <section className="home">
      <TaskAdder />

      <div
        className="card-list"
        style={
          grid
            ? { gridTemplateColumns: "1fr" }
            : { gridTemplateColumns: "repeat(3, 1fr)" }
        }
      >
        {store
          .filter((card) =>
            card.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((ele) => (
            <Card key={ele.id} {...ele} />
          ))}
      </div>
      {store.length >= 1 && (
        <CustomBtn className="btn clear-all-btn" onClick={clearAllElement}>
          Clear All
        </CustomBtn>
      )}
      <div className="overlay-button"></div>
    </section>
  );
};

export default Home;
