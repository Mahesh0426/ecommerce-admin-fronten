import { Alert } from "react-bootstrap";
import ProductForm from "../../components/product/productForm";

const initialFormData = {
  thumbnail: "",
  parentCategory: "",
  name: "",
  price: "",
  quantity: "",
  sku: "",
  description: "",
  status: "",
  salesPrice: "",
  salesStartDate: "",
  salesEndDate: "",
};

const NewProductPage = () => {
  return (
    <>
      <Alert variant="info" className="text-dark fw-bold fs-4">
        Add New Product
      </Alert>

      <ProductForm initialFormData={initialFormData} />
    </>
  );
};

export default NewProductPage;
