import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  FaShoppingCart,
  FaDollarSign,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const DashboardPage = () => {
  return (
    <div className="container mt-4">
      <Row>
        <Col className="mt-3" md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaShoppingCart size={40} className="text-primary mb-3 " />
              <Card.Title>Sales | Today</Card.Title>
              <h2>145</h2>
              <p className="text-success">
                <strong>12%</strong> increase
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col className="mt-3" md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaDollarSign size={40} className="text-success mb-3" />
              <Card.Title>Revenue | This Month</Card.Title>
              <h2>$3,264</h2>
              <p className="text-success">
                <strong>8%</strong> increase
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col className="mt-3" md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaUsers size={40} className="text-warning mb-3" />
              <Card.Title>Customers | This Year</Card.Title>
              <h2>244</h2>
              <p className="text-success">
                <strong>7%</strong> increase
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mt-3" md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h3>
                <FaChartLine size={40} className="text-info mb-3" /> Growth
              </h3>
              <p className="h2">+12.5%</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
