// import { useState } from "react";
// // import { doc } from "firebase/firestore";
// import { FaImage, FaPlus, FaPalette } from "react-icons/fa";
// import CustomBtn from "../../component/custom-btn/CustomBtn";
// import CustomInput from "../../component/custom-input/CustomInut.component";
// import { query, close } from "../../routes/home/Home";
// import Card from "../card/card.component";

// import "./task-adder.styles.scss";

// const TaskAdder = () => {
//   const [state, setState] = useState({
//     title: "",
//     subTitle: "",
//     task: [],
//   });

//   //destructure
//   const { title, subTitle, task } = state;

//   const inputChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setState(() => {
//       return {
//         ...state,
//         [name]: value,
//       };
//     });
//   };

//   /////////////////////////////////////////////////
//   //open btn
//   const expand = function () {
//     query(".label", "input-title");
//     query(".file", "abs-file");
//     query(".close", "close-taskbar");
//     query("#title", "input-title");
//     query("#fileid", "input-width");
//     query(".overlay", "hidden-overlay", "toggle");
//     query(".flex", "remove-flex");
//     query(".add-btn", "abs-btn");
//   };

//   /////////////////////////////////////////////////
//   const addTask = () => {
//     const titleInput = document.querySelector("#title");
//     const subTitleInput = document.querySelector("#fileid");
//     if (titleInput.value === "" || subTitleInput.value === "") {
//       alert("Fill the input field");
//       return;
//     }

//     const data = {
//       id: Math.random() * 10000,
//       title,
//       subTitle,
//     };
//     task.push(data);
//     setState({
//       ...state,
//       title: "",
//       subTitle: "",
//     });
//     console.log(task);
//   };
//   /////////////////////////////////////////////////////////////////////////
//   return (
//     <div className="task-adder">
//       <CustomInput
//         type="text"
//         id="title"
//         placeholder="Title"
//         required
//         name="title"
//         value={title}
//         handleChange={inputChangeHandler}
//       />
//       <div className="flex ">
//         <CustomInput
//           name="subTitle"
//           value={subTitle}
//           onClick={expand}
//           type="text"
//           placeholder="Take a note..."
//           id="fileid"
//           handleChange={inputChangeHandler}
//           required
//         />
//         <CustomInput type="file" hidden id="file" />
//         <CustomBtn className="add-btn" onClick={addTask}>
//           <FaPlus size={20} color="#555" />
//         </CustomBtn>
//         <label className="file" htmlFor="file">
//           <FaImage size={20} color="#555" />
//         </label>
//         <div className="task-menu">
//           <div>
//             {/* <span className="span">
//               <FaImage size={20} color="#555" />
//             </span> */}

//             <CustomInput type="color" id="color" hidden />
//             <label htmlFor="color" className="label">
//               <FaPalette size={20} color="#555" />
//             </label>
//           </div>
//           <CustomBtn className="close" onClick={close}>
//             Close
//           </CustomBtn>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default TaskAdder;
