import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewBorder } from "../../features/slice/BordersSlice";

const AddBorder = () => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.border);

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    birthDate: "",
    guardianName: "",
    relationWithGuardian: "",
    borderOccupation: "",
    borderPhoneNumber: "",
    guardianPhoneNumber: "",
    parmanentAddress: "",
    upazilla: "",
    district: "",
    occupationalAddress: "",
    roomNumber: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data here
    dispatch(addNewBorder(formData));
    console.log(formData);
    // Reset the form after submission
    setFormData({
      name: "",
      fatherName: "",
      motherName: "",
      birthDate: "",
      guardianName: "",
      relationWithGuardian: "",
      borderOccupation: "",
      borderPhoneNumber: "",
      guardianPhoneNumber: "",
      parmanentAddress: "",
      upazilla: "",
      district: "",
      occupationalAddress: "",
      roomNumber: "",
      gender: "",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Border added successfully");
    }
  }, [isSuccess]);

  return (
    <>
      <br />
      <h2 className="text-success text-center"> Add A New Border</h2>
      <br />
      <div
        className="container p-4 border border-success"
        style={{ width: "100%", maxWidth: "650px" }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="fatherName">
            <Form.Label>Father's Name</Form.Label>
            <Form.Control
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="motherName">
            <Form.Label>Mother's Name</Form.Label>
            <Form.Control
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="birthDate">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="guardianName">
            <Form.Label>Guardian's Name</Form.Label>
            <Form.Control
              type="text"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="relationWithGuardian">
            <Form.Label>Relationship with Guardian</Form.Label>
            <Form.Control
              type="text"
              name="relationWithGuardian"
              value={formData.relationWithGuardian}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="borderOccupation">
            <Form.Label>Border's Occupation</Form.Label>
            <Form.Control
              type="text"
              name="borderOccupation"
              value={formData.borderOccupation}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="borderPhoneNumber">
            <Form.Label>Border's Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="borderPhoneNumber"
              value={formData.borderPhoneNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="guardianPhoneNumber">
            <Form.Label>Guardian's Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="guardianPhoneNumber"
              value={formData.guardianPhoneNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="parmanentAddress">
            <Form.Label>Permanent Address</Form.Label>
            <Form.Control
              type="text"
              name="parmanentAddress"
              value={formData.parmanentAddress}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="upazilla">
            <Form.Label>Upazilla</Form.Label>
            <Form.Control
              type="text"
              name="upazilla"
              value={formData.upazilla}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="district">
            <Form.Label>Home District</Form.Label>
            <Form.Control
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="occupationalAddress">
            <Form.Label>Occupational Address</Form.Label>
            <Form.Control
              type="text"
              name="occupationalAddress"
              value={formData.occupationalAddress}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="roomNumber">
            <Form.Label>Rome No</Form.Label>
            <Form.Control
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Control>
          </Form.Group>
          <br />

          <Button variant="success" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </div>
      <br />
    </>
  );
};

export default AddBorder;
