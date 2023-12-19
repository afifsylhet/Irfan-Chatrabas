import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteIncomeData, fetchIncomeDetails, updateIncomeData } from "../../features/slice/incomeSlice";

const EditIncome = () => {
  const { incomeId } = useParams();
  const dispatch = useDispatch();
  const { isUpdated, income } = useSelector((state) => state.income);
  const [formData, setFormData] = useState(income);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchIncomeDetails(incomeId));
  }, [dispatch, incomeId]);

  useEffect(() => {
    setFormData(income);
    if (isUpdated) {
      alert("Income updated successfully");
    }
  }, [income, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateIncomeData({ incomeId, formData }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const deleteIncomeHandler = () => {
    dispatch(deleteIncomeData(incomeId));
    navigate("/incomes")
  };


  return (
    <>
    <br/>
    <br/>
    <Container>
      <div>
        <Form onSubmit={handleSubmit}>
          <p>Border Name : {income?.borderName}</p>
          <p>Border Name : {income?.borderId}</p>
          <Form.Group as={Row} controlId="paymentType" className="mb-3">
            <Form.Label column sm={2}>
              Payment Type
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select" 
                name="paymentType"
                onChange={handleInputChange}
                value={formData?.paymentType}
                required
              >
                <option value="">Select Payment Type</option>
                <option value="New">New</option>
                <option value="Old">Old</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formdeposit" className="mb-3">
            <Form.Label column sm={2}>
              Initial Deposit
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="deposit"
                value={formData?.deposit}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDevelopmentFee" className="mb-3">
            <Form.Label column sm={2}>
              Development Fee
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="developmentFee"
                value={formData?.developmentFee}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formMonthlyFee" className="mb-3">
            <Form.Label column sm={2}>
              Monthly Fee
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="monthlyFee"
                value={formData?.monthlyFee}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>
          <Button type="submit" className="bg-success w-100 py-2">
            Submit
          </Button>
        </Form>
        <br />
        <Button type="submit" className="bg-success w-100 py-2" onClick={deleteIncomeHandler}>
            Delete This Income
          </Button>
      </div>
      </Container>
    </>
  );
};

export default EditIncome;
