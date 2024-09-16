import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import CustomInput from "../CustomInput";
import { signupFormFields } from "./signupFormFields";
import { createUser } from "../../axios/userAxios";
import { toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import useLoading from "../../hooks/useLoading";

const formValidation = (formData) => {
  const { password, confirmPassword } = formData;

  return password === confirmPassword;
};
const initialFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const { formData, handleOnChange, setFormData } = useForm(initialFormData);
  const { firstName, lastName, email, address, phone, password } = formData;
  const { isLoading, startLoading, stopLoading } = useLoading();

  //handle on submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const isValidPassword = formValidation(formData);

    if (!isValidPassword) {
      return toast.error("Password and confirm password should match");
    }
    startLoading();
    // call api via axios to create user
    const result = await createUser({
      firstName,
      lastName,
      email,
      address,
      phone,
      password,
    });
    stopLoading();

    if (result?.status === "error") {
      return toast.error(result.message || "Cannot create user!");
    }

    setFormData(initialFormData);
    toast.success(result.message || " Email verification link sent.");
  };

  return (
    <Container className="p-4 border shadow-lg rounded-4">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        <h2 className="text-center mb-4">Create an Account</h2>

        <Row>
          {signupFormFields.map((field, index) => (
            <Col key={index} xs={index === 0 || index === 1 ? 6 : 12}>
              <CustomInput
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
            </Col>
          ))}
        </Row>

        <Button
          variant="primary"
          className="btn-lg w-100"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" role="status" /> : "Signup"}
        </Button>
        <p className="pt-2">
          Already have have account? <Link to="/">Login</Link>
        </p>
      </Form>
    </Container>
  );
};

export default SignupForm;
