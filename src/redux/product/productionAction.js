import { toast } from "react-toastify";
import {
  createProduct,
  createProductImages,
  deleteProductImage,
  getProduct,
  getProducts,
  updateProduct,
} from "../../axios/productAxios";
import { setIsLoading, setProduct, setProducts } from "./productSlice";

// GET A PRODUCT
export const getProductAction = (_id) => async (dispatch) => {
  const result = await getProduct(_id);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setProduct(result.data));
};

// GET ALL PRODUCTS
export const getProductsAction = () => async (dispatch) => {
  const result = await getProducts();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setProducts(result.data));
};

// CREATE A PRODUCT
export const createProductAction = (productObj) => async (dispatch) => {
  //set isCreating true
  dispatch(setIsLoading(true));
  // call create category API
  const result = await createProduct(productObj);

  // set isCreating false
  dispatch(setIsLoading(false));

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);
  dispatch(getProductsAction());
};

// UPDATE A PRODUCT
export const updateProductAction = (productObj) => async (dispatch) => {
  //set isCreating true
  dispatch(setIsLoading(true));
  // call create category API
  const result = await updateProduct(productObj);
  // set isCreating false
  dispatch(setIsLoading(false));

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);
  dispatch(getProductsAction());
};

// // CREATE A PRODUCT IMAGES
export const createProductImagesAction =
  (id, productObj) => async (dispatch) => {
    //set isCreating true
    dispatch(setIsLoading(true));
    // call create category API
    const result = await createProductImages(productObj);
    // set isCreating false
    dispatch(setIsLoading(false));

    if (result?.status === "error") {
      return toast.error(result.message);
    }

    toast.success(result.message);
    dispatch(getProductAction(id));
    dispatch(getProductsAction());
  };

//delete product
export const deleteProductImageAction = (productId) => async (dispatch) => {
  // call create category API
  const result = await deleteProductImage(productId);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);

  dispatch(getProductsAction());
};
