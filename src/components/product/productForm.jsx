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
import useForm from "../../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import {
  createProductAction,
  updateProductAction,
} from "../../redux/product/productionAction";
import { productFormFields } from "./productFields";
import CustomInput from "../CustomInput";

const ProductForm = (props) => {
  const { initialFormData } = props;
  const { formData, handleOnChange } = useForm(initialFormData);

  const { categories } = useSelector((state) => state.category);
  const { isLoading } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // PROCESS FORM DATA TO SEND IMAGE FILE AS WELL IN XML
    let formObject = new FormData();

    Object.entries(formData).forEach(([name, value]) =>
      formObject.append(name, value)
    );

    // Call Actions
    formData?._id
      ? dispatch(updateProductAction(formObject))
      : dispatch(createProductAction(formObject));

    navigate("/admin/products");
  };

  const buttonText = formData?._id ? "Update" : "Create";

  return (
    <Container className="p-4 shadow-lg rounded d-flex justify-content-center">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        <Row>
          {productFormFields.map((field, index) => {
            const singleRow = index === 6;

            return (
              <Col key={index} xs={singleRow ? 12 : 6}>
                <CustomInput
                  label={field.label}
                  handleOnChange={handleOnChange}
                  inputAttributes={{
                    type: field.type,
                    name: field.name,
                    value: formData[field.name],
                    required: field.required,
                    placeholder: field.placeholder,
                    rows: 4,
                  }}
                  options={
                    field.options ||
                    categories.map((category) => ({
                      value: category.title,
                      label: category.title,
                    }))
                  }
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

          <Link to="/admin/products" className="w-100">
            <Button variant="outline-danger" className="w-100">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Form>
    </Container>
  );
};

export default ProductForm;
