import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewRoom } from "../../features/slice/roomSlice";

const AddRoom = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    roomNumber: null,
    floorNumber: "",
    roomType: "",
    roomStatus: "",
  });

  useEffect(() => {
    if (user) {
      formData.entryBy = user.name;
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Special handling for totalAmount field
    if (name === "roomNumber") {
      const parsedAmount = parseFloat(value);
      setFormData((prevData) => ({ ...prevData, [name]: parsedAmount }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addNewRoom(formData));
    setFormData({
      roomNumber: "",
      floorNumber: "",
      roomType: "",
      roomStatus: "",
    });
  };

  return (
    <>
      <br />
      <br />
      <Container>
        <h3 className="text-center"> Add a Room</h3>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="roomNumber" className="mb-3">
            <Form.Label column sm={2}>
              Room Number
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="Number"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="floor" className="mb-3">
            <Form.Label column sm={2}>
              Floor
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="1st Floor"
                name="floorNumber"
                value="1st Floor"
                checked={formData.floorNumber === "1st Floor"}
                onChange={handleInputChange}
                required
              />
              <Form.Check
                type="radio"
                label="2nd Floor"
                name="floorNumber"
                value="2nd Floor"
                checked={formData.floorNumber === "2nd Floor"}
                onChange={handleInputChange}
                required
              />
              <Form.Check
                type="radio"
                label="3rd Floor"
                name="floorNumber"
                value="3rd Floor"
                checked={formData.floorNumber === "3rd Floor"}
                onChange={handleInputChange}
                required
              />
              <Form.Check
                type="radio"
                label="4th Floor"
                name="floorNumber"
                value="4th Floor"
                checked={formData.floorNumber === "4th Floor"}
                onChange={handleInputChange}
                required
              />
              <Form.Check
                type="radio"
                label="5th Floor"
                name="floorNumber"
                value="5th Floor"
                checked={formData.floorNumber === "5th Floor"}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="roomType" className="mb-3">
            <Form.Label column sm={2}>
              Room Type
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Single"
                name="roomType"
                value="Single"
                checked={formData.roomType === "Single"}
                onChange={handleInputChange}
                required
              />
              <Form.Check
                type="radio"
                label="Double"
                name="roomType"
                value="Double"
                checked={formData.roomType === "Double"}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="roomType" className="mb-3">
            <Form.Label column sm={2}>
              Room Status
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Empty"
                name="roomStatus"
                value="Empty"
                checked={formData.roomStatus === "Empty"}
                onChange={handleInputChange}
                required
              />
              <Form.Check
                type="radio"
                label="Partial Booked"
                name="roomStatus"
                value="Partial Booked"
                checked={formData.roomStatus === "Partial Booked"}
                onChange={handleInputChange}
                required
              />
              <Form.Check
                type="radio"
                label="Full Booked"
                name="roomStatus"
                value="Full Booked"
                checked={formData.roomStatus === "Full Booked"}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100 py-2">
            Create Room
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddRoom;
