import { toast } from "react-toastify";
import { getCartItems, updateOrderStatus } from "../../axios/cartAxios";
import { setCarts } from "./cartSlice";

// get all cart items
export const getCartItemsAction = () => async (dispatch) => {
  const result = await getCartItems();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setCarts(result.data));
};

// update a status order
export const updateOrderStatusAction = (orderObj) => async (dispatch) => {
  const result = await updateOrderStatus(orderObj);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(getCartItemsAction());
};
