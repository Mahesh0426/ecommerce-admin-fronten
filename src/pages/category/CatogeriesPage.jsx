import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryCard from "../../components/categoryCard/categoryCard";
import { getCategoriesAction } from "../../redux/category/categoryAction";

const CategoriesPage = () => {
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  // State to manage the search input, initialized to an empty string
  const [searchCategory, setSearchCategory] = useState("");

  useEffect(() => {
    // Dispatch action to get all categories
    dispatch(getCategoriesAction());
  }, [dispatch]);

  /// Filter categories based on search category
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <Container>
      <Row>
        <Col xs={9}>
          <Form.Control
            type="text"
            placeholder="Search by title..."
            value={searchCategory}
            onChange={(e) => {
              setSearchCategory(e.target.value);
            }}
          />
        </Col>

        <Col xs={3}>
          <Link to="/admin/new-category">
            <Button variant="success" className="btn-md w-100">
              Create
            </Button>
          </Link>
        </Col>
      </Row>

      <Stack direction="vertical" gap={2} className="mt-2">
        {filteredCategories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </Stack>
    </Container>
  );
};

export default CategoriesPage;
