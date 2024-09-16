import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import { useEffect, useState } from "react";
import {
  createProductImagesAction,
  getProductAction,
} from "../../redux/product/productionAction";

const ManageProductImages = () => {
  const { id } = useParams();

  const [productImages, setProductImages] = useState([]);

  const { product, isLoading } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // PROCESS FORM DATA TO SEND IMAGE FILE AS WELL IN XML
    // FormData is a class here and formObject is object of FormData class
    let formObject = new FormData();

    Array.from(productImages).forEach((image) => {
      formObject.append("images", image);
    });

    // append product id as well
    formObject.append("_id", product._id);

    // dispatch action to create images
    dispatch(createProductImagesAction(product._id, formObject));
  };

  const handleOnImageChange = (e) => {
    const { files } = e.target;

    setProductImages(files);
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductAction(id));
    }
  }, [dispatch, id]);

  return (
    <Container>
      <Form onSubmit={handleOnSubmit}>
        <Row className="d-flex align-items-center">
          <Col xs={9}>
            <CustomInput
              handleOnChange={handleOnImageChange}
              inputAttributes={{
                type: "file",
                name: "images",
                multiple: true,
              }}
            />
          </Col>

          <Col xs={3}>
            <Button
              variant="outline-success"
              className="w-100 mt-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Upload"
              )}
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {product?.images?.map((image) => (
          <Col key={image}>
            <Image src={image} height="100px" width="100px" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ManageProductImages;
