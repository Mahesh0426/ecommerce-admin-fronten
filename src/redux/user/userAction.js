import { toast } from "react-toastify";
import { setUser, setUsers } from "./userSlice";
import {
  getNewAccessJwt,
  getUser,
  getUsers,
  logoutUser,
  updateUserRole,
} from "../../axios/userAxios";

// GET USER ACTION
export const getUserAction = () => async (dispatch) => {
  const result = await getUser();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setUser(result.data));
};

//GET ALL USERS
export const getAllUsersAction = () => async (dispatch) => {
  const result = await getUsers();
  console.log(result);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setUsers(result.data));
};
// AUTOLOGIN
export const autoLoginAction = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (!accessJWT && refreshJWT) {
    const result = await getNewAccessJwt();

    if (result?.status === "success") {
      sessionStorage.setItem("accessJWT", result.data);
      dispatch(getUserAction());
    }
  }
  // another endpoint saying validate access token
  // check if we have access token and if yes, dispatch get user action
  dispatch(getUserAction());
};

// Logout User
export const logoutUserAction = (email) => async (dispatch) => {
  // call api to delete session and update user's refesh token
  const result = await logoutUser(email);

  if (result?.status === "success") {
    // remove tokens from storage
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");

    // clear state
    dispatch(setUser({}));

    return toast.success(result.message);
  }

  return toast.error(result.message);
};

///update  a user's role
export const updateUserRoleAction = (userObj) => async (dispatch) => {
  const result = await updateUserRole(userObj);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(getAllUsersAction());
};
