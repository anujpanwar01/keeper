import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: [],
};
const cardSlice = createSlice({
  name: "cardSlice",
  initialState,
  // initialState: [
  //   // {
  //   //   id: 1,
  //   //   title: "running",
  //   //   subTitle: "hello",
  //   //   completed: false,
  //   //   color: "#fff",
  //   //   file: "https://www.koimoi.com/wp-content/new-galleries/2021/12/when-akshay-kumar-threw-an-impromptu-party-to-celebrate-the-success-of-kambakkht-ishq-001.jpg",
  //   // },
  // ],
  reducers: {
    addData: (state, action) => {
      const data = {
        id: action.payload.id,
        title: action.payload.title,
        subTitle: action.payload.subTitle,
        color: action.payload.color,
        file: action.payload.file,
        src: action.payload.src,
        completed: false,
      };
      state.store.push(data);
    },
    delCard: (state, action) => {
      // 1) don't destructure state in arguments field
      // 2) it return new array or mutate  return state.store.filter((ele) => ele.id !== action.payload.id); // it's not working because it mutate the original array

      state.store = state.store.filter((ele) => ele.id !== action.payload.id);
    },
  },
});

export const { addData, delCard } = cardSlice.actions;
export default cardSlice.reducer;
