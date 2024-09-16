import { toast } from "react-toastify";
import { setCarts } from "./cartSlice";
import { getOrderHistory, updateOrderStatus } from "../../axios/cartAxios";

// get all cart items
export const getCartItemsAction = () => async (dispatch) => {
  const result = await getOrderHistory();

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
