import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "cardSlice",
  initialState: [
    // {
    //   id: 1,
    //   title: "running",
    //   subTitle: "hello",
    //   completed: false,
    //   color: "#fff",
    //   file: "https://www.koimoi.com/wp-content/new-galleries/2021/12/when-akshay-kumar-threw-an-impromptu-party-to-celebrate-the-success-of-kambakkht-ishq-001.jpg",
    // },
  ],
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
      state.push(data);
    },
  },
});

export const { addData } = cardSlice.actions;
export default cardSlice.reducer;
