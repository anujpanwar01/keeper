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
//open the input field
export const expand = function () {
  query(".label", "input-title");
  query(".file", "abs-file");
  query(".close", "close-taskbar");
  query("#title", "input-title");
  query("#fileid", "input-width");
  query(".overlay", "hidden-overlay", "toggle");
  query(".flex", "remove-flex");
  query(".add-btn", "abs-btn");
};
const Home = () => {
  const data = useSelector((state) => state.card);
  const { search } = useSelector((state) => state.search);
  console.log(data, search);
  // console.log(search);
  // const [state, setState] = useState({
  //   title: "",
  //   subTitle: "",

  //   task: [],
  // });
  // // useEffect(()=>{

  // })
  //destructure
  // const { title, subTitle, task } = state;

  // const { searchValue } = useContext(SearchContext);
  // const search = searchValue ? searchValue.toLocaleLowerCase() : searchValue; //make the search field input to lower case

  // const inputChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setState(() => {
  //     return {
  //       ...state,
  //       [name]: value,
  //     };
  //   });
  // };

  // const addCard = (e) => {
  //   e.preventDefault();
  // };
  // console.log(title, subTitle);
  // /////////////////////////////////////////////////
  // const addTask = () => {
  //   const titleInput = document.querySelector("#title");
  //   const subTitleInput = document.querySelector("#fileid");
  //   if (titleInput.value === "" || subTitleInput.value === "") {
  //     alert("Fill the input field");
  //     return;
  //   }

  //   const data = {
  //     id: Math.random() * 10000,
  //     title,
  //     subTitle,
  //   };
  //   // dispatch(
  //   //   addData({
  //   //     id: Math.random() * 1000 * new Date(),
  //   //     title,
  //   //     subTitle,
  //   //   })
  //   // );

  //   task.push(data);

  //   setState({
  //     ...state,
  //     title: "",
  //     subTitle: "",
  //   });
  // };
  /////////////////////////////////////////////////
  return (
    <section className="home">
      <TaskAdder />
      {/* <div className="task-adder">
        <form onSubmit={addCard}>
          <CustomInput
            type="text"
            id="title"
            placeholder="Title"
            name="title"
            value={title}
            handleChange={inputChangeHandler}
          />
          <div className="flex ">
            <CustomInput
              name="subTitle"
              value={subTitle}
              onClick={expand}
              type="text"
              placeholder="Take a note..."
              id="fileid"
              handleChange={inputChangeHandler}
            />
            <CustomInput type="file" hidden id="file" />
            <CustomBtn type="submit">submit</CustomBtn>
            <CustomBtn className="add-btn" onClick={addTask}>
              <FaPlus size={20} color="#555" />
            </CustomBtn>
            <label className="file" htmlFor="file">
              <FaImage size={20} color="#555" />
            </label>
            <div className="task-menu">
              <div>
                {/* <span className="span">
              <FaImage size={20} color="#555" />
            </span> 

                <CustomInput type="color" id="color" hidden />
                <label htmlFor="color" className="label">
                  <FaPalette size={20} color="#555" />
                </label>
              </div>
              <CustomBtn className="close" onClick={close}>
                Close
              </CustomBtn>
            </div>
          </div>
        </form>
      </div> */}
      {/* <div
        onClick={close}
        className="overlay hidden-overlay"
        style={{
          position: "absolute",
          height: "100vh",
          width: "100%",
          zIndex: "1",
          top: "0",
        }}
      ></div> */}
      <div className="card-list">
        {data
          .filter((card) => card.title.toLowerCase().includes(search))
          .map((ele) => (
            <Card key={ele.id} {...ele} />
          ))}
      </div>
    </section>
  );
};

export default Home;
