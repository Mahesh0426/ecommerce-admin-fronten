/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SidebarItem = (props) => {
  const { icon, label, path, activeItem, setActiveItem } = props;

  return (
    <Link className="text-decoration-none p-1 me-atuo" to={path}>
      <Button
        variant={activeItem === label ? "info" : "outline-info"}
        className="fw-bold text-dark w-100 text-start"
        onClick={() => setActiveItem(label)}
      >
        {icon} {label}
      </Button>
    </Link>
  );
};

export default SidebarItem;
