import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
    <br/>
      <Container fluid>
        <Row>
            <Col xs={12} md={12} lg={3}>
                <h1>This is sidebar</h1>
            </Col>
            <Col xs={12} md={12} lg={9}>
                <h1>This is the body</h1>
            </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
