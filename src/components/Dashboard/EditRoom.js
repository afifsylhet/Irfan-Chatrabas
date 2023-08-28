import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteRoomData,
  fetchRoomDetails,
  updateRoomData,
} from "../../features/slice/roomSlice";

const EditRoom = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const { isUpdated, room } = useSelector((state) => state.room);
  const [formData, setFormData] = useState(room);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRoomDetails(roomId));
  }, [dispatch, roomId]);

  useEffect(() => {
    setFormData(room);
    if (isUpdated) {
      alert("Room updated successfully");
    }
  }, [room, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRoomData({ roomId, formData }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const deleteRoomHandler = () => {
    dispatch(deleteRoomData(roomId));
    navigate("/rooms");
  };

console.log(formData)


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
                value={formData?.roomNumber}
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
            Update This Room
          </Button>
        </Form>
        <br />
        <Button type="submit" className="bg-success w-100 py-2" onClick={deleteRoomHandler}>
            Delete This Room
          </Button>
      </Container>
    </>
  );
};

export default EditRoom;
