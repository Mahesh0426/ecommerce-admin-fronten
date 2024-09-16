import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";

import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import { resetPasswordEmail } from "../../axios/userAxios";
import logo from "../../assets/logo.png";
import CustomInput from "../../components/CustomInput";

const initialFormData = {
  email: "",
};

const ForgetPasswordPage = () => {
  const { formData, handleOnChange } = useForm(initialFormData);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPasswordEmail(formData);
    console.log(result);
    if (result.status === "error") {
      toast.error(result.message);
    }
    toast.success(result.message);
  };
  return (
    <>
      <Container fluid>
        <Row className=" d-flex justify-content-center mt-5 vh-100">
          <Col md={6} lg={4}>
            <div className="text-center mb-4">
              <Image src={logo} height={60} width={120} />
            </div>
            <Card className="  mb-5 p-4 shadow-lg rounded">
              <h2>Password Assistance!!</h2>
              <p>Enter the email address associated with your account.</p>
              <Form onSubmit={handleOnSubmit}>
                <CustomInput
                  label="Enter your Email"
                  handleOnChange={handleOnChange}
                  inputAttributes={{
                    type: "email",
                    name: "email",
                    placeholder: "Enter your email",
                    value: formData.email,
                    required: true,
                  }}
                />

                <Button
                  type="submit"
                  variant="warning"
                  className="mt-2 btn w-100"
                >
                  Continue
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgetPasswordPage;
