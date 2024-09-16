import { toast } from "react-toastify";
import { setCategories, setIsLoading } from "./categorySlice";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../axios/categoryAxios";

// GET ALL CATEGORIES
export const getCategoriesAction = () => async (dispatch) => {
  const result = await getCategories();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setCategories(result.data));
};

// CREATE CATEGORY ACTION
export const createCategoryAction = (categoryObj) => async (dispatch) => {
  //set isCreating true
  dispatch(setIsLoading(true));
  // call create category API
  const result = await createCategory(categoryObj);
  // set isCreating false
  dispatch(setIsLoading(false));

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);
  dispatch(getCategoriesAction());
};

// UPDATE/EDIT A CATEGORY
export const updateCategoryAction = (categoryObj) => async (dispatch) => {
  //set isCreating true
  dispatch(setIsLoading(true));
  // call update category API
  const result = await updateCategory(categoryObj);
  // set isCreating false
  dispatch(setIsLoading(false));

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);
  dispatch(getCategoriesAction());
};

// DELETE A CATEGORY
export const deleteCategoryAction = (categoryId) => async (dispatch) => {
  // call delete category API
  const result = await deleteCategory(categoryId);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);
  dispatch(getCategoriesAction());
};
