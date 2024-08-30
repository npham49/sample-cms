import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    value: undefined,
  },
  reducers: {
    updatePost: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updatePost } = postSlice.actions;

export default postSlice.reducer;
