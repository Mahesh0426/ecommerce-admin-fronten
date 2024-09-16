import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryForm from "../../components/categoryForm/categoryForm";

const EditCategoryPage = () => {
  // get category id from url parameter
  const { id } = useParams();

  // fetch the category data from redux state
  const { categories } = useSelector((state) => state.category);

  const category = categories?.find((category) => category._id === id);

  const categoryData = {
    thumbnail: "",
    _id: category?._id,
    title: category?.title,
  };

  return (
    <>
      <Alert variant="info" className="text-dark fw-bold fs-4">
        Edit Category
      </Alert>

      <CategoryForm initialFormData={categoryData} />
    </>
  );
};

export default EditCategoryPage;
