import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import ProductForm from "../../components/product/productForm";

const EditProductPage = () => {
  const { id } = useParams();

  const { products } = useSelector((state) => state.product);
  const product = products?.find((product) => product._id === id);

  const productData = {
    thumbnail: "",
    _id: product?._id,
    parentCategory: product?.parentCategory,
    name: product?.name,
    price: product?.price,
    quantity: product?.quantity,
    sku: product?.sku,
    description: product?.description,
    status: product?.status,
    salesPrice: product?.salesPrice || "",
    salesStartDate: product?.salesStartDate
      ? format(new Date(product?.salesStartDate), "yyyy-MM-dd", "")
      : "",
    salesEndDate: product?.salesEndDate
      ? format(new Date(product?.salesEndDate), "yyyy-MM-dd", "")
      : "",
  };

  return (
    <>
      <Alert variant="info" className="text-dark fw-bold fs-4">
        Edit Product
      </Alert>

      <ProductForm initialFormData={productData} />
    </>
  );
};

export default EditProductPage;
