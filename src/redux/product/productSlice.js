import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const { reducer: productReducer, actions } = productSlice;

export const { setProducts, setIsLoading, setProduct } = actions;
export default productReducer;
