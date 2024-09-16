/* eslint-disable react/prop-types */
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import {
  createCategoryAction,
  updateCategoryAction,
} from "../../redux/category/categoryAction";
import { categoryFormFields } from "./categoryFormFields";
import CustomInput from "../CustomInput";

const CategoryForm = (props) => {
  const { initialFormData } = props;
  const { formData, handleOnChange } = useForm(initialFormData);

  const { isLoading } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // PROCESS FORM DATA TO SEND IMAGE FILE AS WELL IN XML
    let formObject = new FormData();

    Object.entries(formData).forEach(([name, value]) =>
      formObject.append(name, value)
    );

    // // Call Actions
    //dispatch(createCategoryAction(formObject));
    formData?._id
      ? dispatch(updateCategoryAction(formObject))
      : dispatch(createCategoryAction(formObject));
    navigate("/admin/categories");
  };

  const buttonText = formData?._id ? "Update" : "Create";

  return (
    <Container className="p-4 shadow-lg rounded d-flex justify-content-center">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        <Row>
          {categoryFormFields.map((field, index) => {
            return (
              <Col key={index} xs={12}>
                <CustomInput
                  key={index}
                  label={field.label}
                  handleOnChange={handleOnChange}
                  inputAttributes={{
                    type: field.type,
                    name: field.name,
                    value: formData[field.name],
                  }}
                />
              </Col>
            );
          })}
        </Row>

        <Stack direction="horizontal" gap={2} className="pt-4">
          <Button
            variant="outline-success"
            className="w-100"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" role="status" />
            ) : (
              buttonText
            )}
          </Button>

          <Link to="/admin/categories" className="w-100">
            <Button variant="outline-danger" className="w-100">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Form>
    </Container>
  );
};

export default CategoryForm;
