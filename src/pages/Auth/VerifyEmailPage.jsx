import { useEffect, useState } from "react";
import { Container, Spinner, Stack } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyUser } from "../../axios/userAxios";

const VerifyEmailPage = () => {
  const [emailVerifying, setEmailVerifying] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  // grab the url params
  //useSearchParams is a hook  that extracts query parameters from the URL.
  const [params] = useSearchParams();
  const userEmail = params.get("e");
  const token = params.get("id");

  const navigate = useNavigate();

  // function to verify email
  const verifyEmail = async () => {
    const result = await verifyUser({ userEmail, token });
    console.log("result:", result);

    setEmailVerifying(false);

    // if user is not verified
    if (result?.status === "error") {
      setEmailVerified(false);

      toast.error(result.message);
      navigate("/signup");
    }

    // if success
    setEmailVerified(true);
  };

  // call an api to verify user on page load
  useEffect(() => {
    if (userEmail && token) {
      // verify email
      verifyEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail, token]);

  return (
    <Container>
      {emailVerified && (
        <Stack
          gap={4}
          className="vh-100 justify-content-center align-items-center"
        >
          <Spinner animation="border" variant="primary" role="status" />

          <p>Verifying email, Please wait ....</p>
        </Stack>
      )}

      {emailVerifying && (
        <Stack
          gap={2}
          className="vh-100 justify-content-center align-items-center"
        >
          <div className="my-4">
            <lord-icon
              src="https://cdn.lordicon.com/twsqddew.json"
              trigger="in"
              delay="100"
              state="in-reveal"
              style={{ width: "250px", height: "250px" }}
            ></lord-icon>
          </div>

          <p>Email successfully verified, You can login now.</p>

          <Link to="/" className="btn btn-lg btn-outline-primary">
            Login Now
          </Link>
        </Stack>
      )}
    </Container>
  );
};

export default VerifyEmailPage;
