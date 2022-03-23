import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "cardSlice",
  initialState: [
    {
      id: 1,
      title: "running",
      subTitle: "hello",
      completed: false,
      color: "#fff",
    },
  ],
  reducers: {
    addData: (state, action) => {
      const data = {
        id: action.payload.id,
        title: action.payload.title,
        subTitle: action.payload.subTitle,
        color: action.payload.color,
        file: action.payload.file,
        completed: false,
      };
      state.push(data);
    },
  },
});

export const { addData } = cardSlice.actions;
export default cardSlice.reducer;
