import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAction,
  updateUserRoleAction,
} from "../../redux/user/userAction";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  //handle on click
  const handleOnClick = (user) => {
    dispatch(
      updateUserRoleAction({
        _id: user._id,
        role: user.role === "admin" ? "user" : "admin",
      })
    );
  };

  return (
    <>
      <div className="text-end mb-2">
        <Link to="/signup">
          <Button variant="outline-primary">add user</Button>
        </Link>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th className="col-1">#</th>
            <th className="col-1 text-wrap">FirstName</th>
            <th className="col-1 text-wrap">LastName</th>
            <th className="col-2">Email</th>
            <th className="col-1">Contact</th>
            <th className="col-1">Role</th>
            <th className="col-1 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant={
                    user.role === "admin" ? "outline-success" : "outline-danger"
                  }
                  onClick={() => handleOnClick(user)}
                >
                  {user.role === "admin"
                    ? "Demote to User"
                    : "Promote to Admin"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserPage;
