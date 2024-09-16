import { Badge, Col, Container, Image, Row, Stack } from "react-bootstrap";
import adminAuthImage from "../../assets/adminAuthImage.svg";
import LoginForm from "../../components/Login/LoginForm";

const LoginPage = () => {
  return (
    <Container>
      <Row className="vh-100">
        <Col className="d-flex">
          <Stack className="justify-content-center align-items-center">
            <Image src={adminAuthImage} height={300} width={300} />
            <Stack direction="horizontal" className="justify-content-center">
              <h3 className="mx-2">ECOM DEN</h3>
              <Badge bg="info">ADMIN</Badge>
            </Stack>
            <pre>
              Empowering Your E-Commerce Empire: Manage, Analyze, and Thrive.
            </pre>
          </Stack>
        </Col>

        <Col className="d-flex justify-content-center align-items-center">
          {/* <LoginForm /> */}
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
