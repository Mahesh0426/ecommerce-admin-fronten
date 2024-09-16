import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/redux/user/userSlice";
import categoryReducer from "./src/redux/category/categorySlice";
import productReducer from "./src/redux/product/productSlice";
import cartReducer from "./src/redux/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
