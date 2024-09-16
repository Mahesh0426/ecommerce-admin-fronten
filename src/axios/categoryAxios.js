import { axiosApiCall } from "./axiosApiCall";

// USER API URL
const CATEGORY_API_URL = `${
  import.meta.env.VITE_APP_API_BASE_URL
}/api/category`;

// PUBLIC ROUTE
// GET ALL CATEGORIES
export const getCategories = () => {
  return axiosApiCall({
    method: "get",
    url: CATEGORY_API_URL,
  });
};

// PRIVATE ROUTE
// CREATE A CATEGORY
export const createCategory = (categoryObj) => {
  return axiosApiCall({
    method: "post",
    url: CATEGORY_API_URL,
    data: categoryObj,
    isPrivate: true,
  });
};

// UPDATE/EDIT A CATEGORY
export const updateCategory = (categoryObj) => {
  return axiosApiCall({
    method: "patch",
    url: CATEGORY_API_URL,
    data: categoryObj,
    isPrivate: true,
  });
};

// DELETE A CATEGORY
export const deleteCategory = (categoryId) => {
  return axiosApiCall({
    method: "delete",
    url: `${CATEGORY_API_URL}/${categoryId}`,
    isPrivate: true,
  });
};
