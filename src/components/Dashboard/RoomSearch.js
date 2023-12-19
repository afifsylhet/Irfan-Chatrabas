import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RoomSearch = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/rooms/${keyword}`);
    } else {
      navigate("/rooms");
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <div
        style={{ height: "95vh", width: "95vw" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Container>
          <Row>
            <Col>
              <Form
                onSubmit={handleSubmit}
                className="d-flex justify-content-center"
              >
                <Form.Group
                  controlId="searchKeyword"
                  style={{ width: "80%", maxWidth: "60%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="Search a product"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="secondary" type="submit" className="ms-2">
                  Search
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RoomSearch;
