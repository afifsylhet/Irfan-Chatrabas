import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteExpenceData,
  fetchExpenceDetails,
  updateExpenceData,
} from "../../features/slice/expenceSlice";

const EditExpence = () => {
  const { expenceId } = useParams();
  const dispatch = useDispatch();
  const { isUpdated, expence } = useSelector((state) => state.expence);
  const [formData, setFormData] = useState(expence);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchExpenceDetails(expenceId));
  }, [dispatch, expenceId]);

  useEffect(() => {
    setFormData(expence);
    if (isUpdated) {
      alert("Expence updated successfully");
    }
  }, [expence, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateExpenceData({ expenceId, formData }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special handling for totalAmount field
    if (name === "totalAmount") {
      const parsedAmount = parseFloat(value);
      setFormData((prevData) => ({ ...prevData, [name]: parsedAmount }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const deleteExpenceHandler = () => {
    dispatch(deleteExpenceData(expenceId));
    navigate("/expences");
  };

  return (
    <>
      <br />
      <br />
      <Container>
        <h3 className="text-center">Update Expence</h3>
        <br/>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formCategory" className="mb-3">
              <Form.Label column sm={2}>
                Expence Category
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Stationery"
                  name="category"
                  value="Stationery"
                  checked={formData?.category === "Stationery"}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <Form.Check
                  type="radio"
                  label="Electrical"
                  name="category"
                  value="Electrical"
                  checked={formData?.category === "Electrical"}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <Form.Check
                  type="radio"
                  label="Maintenance"
                  name="category"
                  value="Maintenance"
                  checked={formData?.category === "Maintenance"}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <Form.Check
                  type="radio"
                  label="Others"
                  name="category"
                  value="Others"
                  checked={formData?.category === "Others"}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              controlId="formExpenseDetails"
              className="mb-3"
            >
              <Form.Label column sm={2}>
                Expense Details
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="expenseDetails"
                  value={formData?.expenseDetails}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="paymentType" className="mb-3">
              <Form.Label column sm={2}>
                Total Amount
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="Number"
                  name="totalAmount"
                  value={formData?.totalAmount}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Button type="submit" className="bg-success w-100 py-2">
              Submit
            </Button>
          </Form>
          <br />
          <Button
            type="submit"
            className="bg-success w-100 py-2"
            onClick={deleteExpenceHandler}
          >
            Delete This Expence
          </Button>
        </div>
      </Container>
    </>
  );
};

export default EditExpence;
