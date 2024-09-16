import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts: (state, action) => {
      state.carts = action.payload;
    },

    removeCartItem: (state, action) => {
      const cartIdToRemove = action.payload;
      state.carts = state.carts.filter((item) => item._id !== cartIdToRemove);
    },
  },
});

const { reducer: cartReducer, actions } = cartSlice;

export const { setCarts, setCartCount, removeCartItem } = actions;
export default cartReducer;
