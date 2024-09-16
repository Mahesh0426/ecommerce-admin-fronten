/* eslint-disable react/prop-types */
import { Badge, Button, Card, Image, Stack } from "react-bootstrap";
import { BsImages, BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProductImageAction } from "../../redux/product/productionAction";

const ProductCard = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const deleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteProductImageAction(productId));
    }
  };

  const productIsOnSale =
    product.salesStartDate > Date.now() && product.salesEndDate < Date.now();
  const isActive = product.status === "active";

  return (
    <Card className="d-flex flex-row align-items-center rounded">
      <Image
        src={product?.thumbnail}
        width={100}
        height={100}
        className="p-1"
        rounded
      />

      <Card.Body>
        <Stack direction="horizontal" gap={2}>
          <Stack>
            <Card.Title>
              {product.name}{" "}
              {isActive ? (
                <Badge bg="success" className="p-2">
                  {" "}
                </Badge>
              ) : (
                <Badge bg="success" className="p-4">
                  {" "}
                </Badge>
              )}
            </Card.Title>
            <Badge bg="secondary" style={{ width: "fit-content" }}>
              {product.parentCategory}
            </Badge>
            <Card.Text className="fw-bold">
              ${product.price} | QTY: {product.quantity}{" "}
              {productIsOnSale && <Badge bg="danger">On Sale</Badge>}
            </Card.Text>
          </Stack>

          <Stack direction="horizontal" gap={2}>
            <Link to={`/admin/edit-product/${product._id}`}>
              <Button variant="outline-success">
                <BsPencil />
              </Button>
            </Link>

            <Link to={`/admin/manage-product-images/${product._id}`}>
              <Button variant="outline-primary">
                <BsImages />
              </Button>
            </Link>

            <Button
              variant="outline-danger"
              onClick={() => deleteProduct(product._id)}
            >
              <BsTrash />
            </Button>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
