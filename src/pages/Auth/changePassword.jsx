import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { changePassword } from "../../axios/userAxios";
import { toast } from "react-toastify";
import useForm from "../../hooks/useForm";

import useLoading from "../../hooks/useLoading";
import logo from "../../assets/logo.png";
import CustomInput from "../../components/CustomInput";

const initialFormData = {
  password: "",
  confirmPassword: "",
};
const ChangePasswordPage = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { formData, handleOnChange, setFormData } = useForm(initialFormData);
  const { password, confirmPassword } = formData;

  const [params] = useSearchParams();
  const userEmail = params.get("e");
  const token = params.get("id");

  const handleOnSubmit = async (e) => {
    startLoading();
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }
    const result = await changePassword({ formData, token, userEmail });
    console.log(result);

    if (result.status === "error") {
      toast.error(result.message);
    }
    stopLoading();
    toast.success(result.message);
    setFormData(initialFormData);
  };

  return (
    <>
      <Container fluid>
        <Row className=" d-flex justify-content-center mt-5 vh-100 ">
          <Col md={6} lg={4}>
            <div className="text-center mb-4">
              <Image src={logo} height={60} width={120} />
            </div>
            <Card className="  mb-5 p-4 shadow-lg rounded ">
              <h2>Password Assistance!!</h2>
              <p> Now you can create your new password.</p>
              <Form onSubmit={handleOnSubmit}>
                <CustomInput
                  label="Enter new Password"
                  handleOnChange={handleOnChange}
                  inputAttributes={{
                    type: "password",
                    name: "password",
                    placeholder: "Enter your password",
                    value: formData.password,
                    required: true,
                  }}
                />
                <CustomInput
                  label="Confirm Password"
                  handleOnChange={handleOnChange}
                  inputAttributes={{
                    type: "password",
                    name: "confirmPassword",
                    placeholder: "Confirm  password",
                    value: formData.confirmPassword,
                    required: true,
                  }}
                />
                <Button
                  type="submit"
                  variant="warning"
                  className="mt-2 btn w-100 "
                >
                  {isLoading ? (
                    <Spinner animation="border" role="status" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </Form>
              <Link className="text-center m-2" to="/">
                {" "}
                Login Now
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChangePasswordPage;
