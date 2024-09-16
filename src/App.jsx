import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AdminPrivateRoutes from "./components/privateAdmin/AdminPrivateRoute";
import AdminLayout from "./components/adminLayout/AdminLayout";
import CategoriesPage from "./pages/category/CatogeriesPage";
import NewCategoryPage from "./pages/category/NewcategoryPage";
import EditCategoryPage from "./pages/category/EditCategoryPage";
import ProductPage from "./pages/Products/ProductPage";
import SignupPage from "./pages/Auth/SignupPage";
import VerifyEmailPage from "./pages/Auth/VerifyEmailPage";
import LoginPage from "./pages/Auth/LoginPage";
import NewProductPage from "./pages/Products/NewProductPage";
import EditProductPage from "./pages/Products/EditProductPage";
import ManageProductImages from "./pages/Products/ManageProductImages";
import UserPage from "./pages/user/UserPage";
import OrderPage from "./pages/order/OrderPage";
import ForgetPasswordPage from "./pages/Auth/ForgetPasswordPage";
import ChangePasswordPage from "./pages/Auth/changePassword";
import DashboardPage from "./pages/dashboard/dashboard";

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/change-Password" element={<ChangePasswordPage />} />

        {/* private routes */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoutes>
              <AdminLayout />
            </AdminPrivateRoutes>
          }
        >
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="new-category" element={<NewCategoryPage />} />
          <Route path="edit-category/:id" element={<EditCategoryPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="new-product" element={<NewProductPage />} />
          <Route path="edit-product/:id" element={<EditProductPage />} />
          <Route path="users" element={<UserPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="dashboard" element={<DashboardPage />} />

          <Route
            path="manage-product-images/:id"
            element={<ManageProductImages />}
          />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
