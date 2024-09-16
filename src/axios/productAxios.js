import { axiosApiCall } from "./axiosApiCall";

// PRODUCT API URL
const PRODUCT_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/product`;

// GET A PRODUCTS
export const getProduct = (_id) => {
  return axiosApiCall({
    method: "get",
    url: `${PRODUCT_API_URL}/${_id}`,
    isPrivate: true,
  });
};

// GET ALL PRODUCTS
export const getProducts = () => {
  return axiosApiCall({
    method: "get",
    url: PRODUCT_API_URL,
  });
};

// CREATE A PRODUCT
export const createProduct = (productObj) => {
  return axiosApiCall({
    method: "post",
    url: PRODUCT_API_URL,
    data: productObj,
    isPrivate: true,
  });
};

// UPDATE A PRODUCT
export const updateProduct = (productObj) => {
  return axiosApiCall({
    method: "patch",
    url: PRODUCT_API_URL,
    data: productObj,
    isPrivate: true,
  });
};

// CREATE A PRODUCT IMAGES
export const createProductImages = (productObj) => {
  return axiosApiCall({
    method: "patch",
    url: `${PRODUCT_API_URL}/productImages`,
    data: productObj,
    isPrivate: true,
  });
};

// DELETE A PRODUCT IMAGE
export const deleteProductImage = (productId) => {
  return axiosApiCall({
    method: "delete",
    url: `${PRODUCT_API_URL}/productImages/${productId}`,
    isPrivate: true,
  });
};
