import { Alert } from "react-bootstrap";
import CategoryForm from "../../components/categoryForm/categoryForm";

const initialFormData = {
  thumbnail: "",
  title: "",
};

const NewCategoryPage = () => {
  return (
    <>
      <Alert variant="info" className="text-dark fw-bold fs-4">
        Add New Category
      </Alert>

      <CategoryForm initialFormData={initialFormData} />
    </>
  );
};

export default NewCategoryPage;
