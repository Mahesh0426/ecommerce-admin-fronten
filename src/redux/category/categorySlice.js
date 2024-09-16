import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const { reducer: categoryReducer, actions } = categorySlice;

export const { setCategories, setIsLoading } = actions;
export default categoryReducer;
