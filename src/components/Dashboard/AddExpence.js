import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { addNewExpnece } from "../../features/slice/expenceSlice";

const AddExpence = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { expence } = useSelector((state) => state.expence);

  const [formData, setFormData] = useState({
    category: "",
    expenseDetails: "",
    totalAmount: 0,
  });

  // Function to handle changes in the form
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

  useEffect(() => {
    if (user) {
      formData.entryBy = user?.name;
      formData.userId = user?._id;
    }
    if(expence){
      alert("Expence Added Successfully")
    }
  }, [user, expence]);

  const handleExpenceSubmit = (event) => {
    event.preventDefault();
    dispatch(addNewExpnece(formData));
    formData.category = "";
    formData.expenseDetails = "";
    formData.totalAmount = 0;
  };

console.log(expence)

  return (
    <>
      <br />
      <br />
      <Container>
        <div>
          <h2 className="text-center fw-semibold">Add A Expence</h2>
          <div>
            <Form onSubmit={handleExpenceSubmit}>
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
                    checked={formData.category === "Stationery"}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <Form.Check
                    type="radio"
                    label="Electrical"
                    name="category"
                    value="Electrical"
                    checked={formData.category === "Electrical"}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <Form.Check
                    type="radio"
                    label="Maintenance"
                    name="category"
                    value="Maintenance"
                    checked={formData.category === "Maintenance"}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <Form.Check
                    type="radio"
                    label="Others"
                    name="category"
                    value="Others"
                    checked={formData.category === "Others"}
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
                    value={formData.expenseDetails}
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
          </div>
          <br />
          <br />
        </div>
      </Container>
    </>
  );
};

export default AddExpence;
