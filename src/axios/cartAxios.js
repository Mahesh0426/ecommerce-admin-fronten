import { axiosApiCall } from "./axiosApiCall";

// Cart API URL
const CART_API_URL = `${
  import.meta.env.VITE_APP_API_BASE_URL
}/api/orderHistory`;

// GET CART
export const getOrderHistory = () => {
  return axiosApiCall({
    method: "get",
    url: CART_API_URL,
    isPrivate: true,
  });
};

//update a  order status
export const updateOrderStatus = (orderObj) => {
  return axiosApiCall({
    method: "patch",
    url: `${CART_API_URL}/${orderObj._id}`,
    data: { status: orderObj.status },
    isPrivate: true,
  });
};
