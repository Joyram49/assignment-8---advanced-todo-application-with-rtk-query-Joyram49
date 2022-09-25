import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colors: [],
  status: "All",
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    statusChanged: (state, action) => {
      state.status = action.payload;
    },
    colorSelected: (state, action) => {
      console.log(action);
      const { color, changeType } = action.payload;
      if (changeType === "added") {
        state.colors.push(color);
      } else if (changeType === "removed") {
        state.colors = state.colors.filter(
          (existingColor) => existingColor !== color
        );
      } else {
        return state;
      }
    },
  },
});

export default filterSlice.reducer;
export const { statusChanged, colorSelected } = filterSlice.actions;
