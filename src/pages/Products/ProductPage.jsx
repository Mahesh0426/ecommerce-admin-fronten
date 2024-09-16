import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getProductsAction } from "../../redux/product/productionAction";
import ProductCard from "../../components/product/productCard";

const ProductPage = () => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // State to manage the search input
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    // Dispatch action to get all products
    dispatch(getProductsAction());
  }, [dispatch]);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <Container>
      <Row>
        <Col xs={8}>
          <Stack gap={4}>
            <Form.Control
              type="text"
              placeholder="Search by title..."
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />

            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Stack>
        </Col>

        <Col xs={4} className="text-end">
          <Link to="/admin/new-product">
            <Button variant="success" className="btn-md">
              Create
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
