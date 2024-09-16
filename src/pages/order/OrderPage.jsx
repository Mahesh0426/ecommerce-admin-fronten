import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SiTicktick } from "react-icons/si";
import {
  getCartItemsAction,
  updateOrderStatusAction,
} from "../../redux/cart/cartAction";

const OrderPage = () => {
  const { carts } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsAction());
  }, [dispatch]);

  // Handle click to update the status
  const handleOnClick = (cart) => {
    if (cart.status === "pending") {
      dispatch(
        updateOrderStatusAction({
          _id: cart._id,
          status: "completed",
        })
      );
    }
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>Product-Name</th>
            <th>Quantity</th>
            <th>TotalAmount</th>
            <th>Status</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart, index) => (
            <tr key={cart._id}>
              <td>{index + 1}</td>
              <td className="text-wrap">{cart.user_name}</td>
              <td>{cart.product_name}</td>
              <td>{cart.quantity}</td>
              <td>{cart.totalAmount}</td>
              <td>
                {cart.status === "completed" ? (
                  <SiTicktick style={{ color: "green", fontSize: "1.5rem" }} />
                ) : (
                  cart.status
                )}
              </td>
              <td className="text-center">
                <Button
                  variant="outline-success"
                  onClick={() => handleOnClick(cart)}
                  disabled={cart.status === "completed"}
                >
                  {cart.status === "pending"
                    ? "Mark as Completed"
                    : "Completed"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderPage;
