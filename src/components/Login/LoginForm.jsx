import {
  Button,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import CustomInput from "../CustomInput";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { loginFormFields } from "./loginFormField";
import useLoading from "../../hooks/useLoading";
import { loginUser } from "../../axios/userAxios";
import { useDispatch, useSelector } from "react-redux";
import { autoLoginAction, getUserAction } from "../../redux/user/userAction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const initialFormData = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const { formData, handleOnChange } = useForm(initialFormData);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle on submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // start loading
    startLoading();

    //API CALL TO LOGIN USER | GET TOKENS
    const result = await loginUser(formData);
    // stop loading
    stopLoading();

    if (result?.status === "error") {
      return toast.error(result.message);
    }
    // If success, we store the accessJWT and refresh JWT in session storage and local storage respectively
    sessionStorage.setItem("accessJWT", result.data.accessJWT);
    localStorage.setItem("refreshJWT", result.data.refreshJWT);

    // once tokens are stored, dispatch action to get user
    dispatch(getUserAction());
  };

  // Logic to handle what should happen if a user is logged in
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // if user exists [logged in], navigate to admin homepage
    if (user?._id) {
      navigate("/admin/dashboard");
    }
    // if no tokens, keep them in login page
    if (
      !sessionStorage.getItem("accessJWT") &&
      !localStorage.getItem("refreshJWT")
    ) {
      return;
    }
    // if not try auto login
    if (!user?._id) {
      dispatch(autoLoginAction());
    }
  }, [user?._id, navigate, dispatch]);

  return (
    <Container className="p-4 pb-0 border shadow-lg rounded-4">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        {loginFormFields.map((field, index) =>
          field.name === "password" ? (
            <InputGroup key={index} className="mb-5">
              <FloatingLabel className="fw-bold" label="Password">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name={field.name}
                  value={formData[field.name]}
                  placeholder={field.placeholder}
                  required
                  onChange={handleOnChange}
                />
              </FloatingLabel>
              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  cursor: "pointer",
                  background: "transparent",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
          ) : (
            <CustomInput
              key={index}
              label={field.label}
              handleOnChange={handleOnChange}
              inputAttributes={{
                type: field.type,
                name: field.name,
                value: formData[field.name],
                placeholder: field.placeholder,
                required: true,
              }}
            />
          )
        )}

        <Button
          variant="primary"
          className="btn-lg w-100"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" role="status" /> : "Login"}
        </Button>

        <p className="pt-2">
          Forgot Password? <Link to="/forget-password">Reset Password</Link>
        </p>
      </Form>
    </Container>
  );
};

export default LoginForm;
