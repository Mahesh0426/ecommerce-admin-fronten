/* eslint-disable react/prop-types */
import { Button, Card, Image, Stack } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { deleteCategoryAction } from "../../redux/category/categoryAction";
import { useDispatch } from "react-redux";

const CategoryCard = (props) => {
  const { category } = props;

  const dispatch = useDispatch();

  // delete category
  const deleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      dispatch(deleteCategoryAction(categoryId));
    }
  };

  return (
    <Card className="d-flex flex-row align-items-center rounded shadow">
      <Image
        src={category.thumbnail}
        width={80}
        height={80}
        className="p-1"
        rounded
      />

      <Card.Body>
        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-between"
        >
          <Card.Title>{category.title}</Card.Title>

          <Stack direction="horizontal" gap={2}>
            <Link to={`/admin/edit-category/${category._id}`}>
              <Button variant="outline-success">
                <BsPencil />
              </Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => deleteCategory(category._id)}
            >
              <BsTrash />
            </Button>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
