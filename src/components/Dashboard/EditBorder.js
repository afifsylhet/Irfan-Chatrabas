import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorderDetails, updateBorderData } from "../../features/slice/BordersSlice";
import { useParams } from "react-router-dom";

const EditBorder = () => {
  const { edit } = useParams();
  const dispatch = useDispatch();
  const { isUpdated, border } = useSelector((state) => state.border);
  const [formData, setFormData] = useState(border);

  useEffect(() => {
    dispatch(fetchBorderDetails(edit));
  }, [dispatch, edit]);

  useEffect(() => {
    setFormData(border);
    if(isUpdated){
      alert("Border updated successfully")
    }
  }, [border, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBorderData({edit, formData}));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <br />
      <h2 className="text-success text-center"> Edit Border Details</h2>
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
              value={formData?.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="fatherName">
            <Form.Label>Father's Name</Form.Label>
            <Form.Control
              type="text"
              name="fatherName"
              value={formData?.fatherName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="motherName">
            <Form.Label>Mother's Name</Form.Label>
            <Form.Control
              type="text"
              name="motherName"
              value={formData?.motherName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="birthDate">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              value={
                formData?.birthDate && String(formData.birthDate.substr(0, 10))
              }
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="guardianName">
            <Form.Label>Guardian's Name</Form.Label>
            <Form.Control
              type="text"
              name="guardianName"
              value={formData?.guardianName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="relationWithGuardian">
            <Form.Label>Relationship with Guardian</Form.Label>
            <Form.Control
              type="text"
              name="relationWithGuardian"
              value={formData?.relationWithGuardian}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="borderOccupation">
            <Form.Label>Border's Occupation</Form.Label>
            <Form.Control
              type="text"
              name="borderOccupation"
              value={formData?.borderOccupation}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="borderPhoneNumber">
            <Form.Label>Border's Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="borderPhoneNumber"
              value={formData?.borderPhoneNumber}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="guardianPhoneNumber">
            <Form.Label>Guardian's Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="guardianPhoneNumber"
              value={formData?.guardianPhoneNumber}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="parmanentAddress">
            <Form.Label>Permanent Address</Form.Label>
            <Form.Control
              type="text"
              name="parmanentAddress"
              value={formData?.parmanentAddress}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="upazilla">
            <Form.Label>Upazilla</Form.Label>
            <Form.Control
              type="text"
              name="upazilla"
              value={formData?.upazilla}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="district">
            <Form.Label>Home District</Form.Label>
            <Form.Control
              type="text"
              name="district"
              value={formData?.district}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="occupationalAddress">
            <Form.Label>Occupational Address</Form.Label>
            <Form.Control
              type="text"
              name="occupationalAddress"
              value={formData?.occupationalAddress}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="roomNumber">
            <Form.Label>Rome No</Form.Label>
            <Form.Control
              type="text"
              name="roomNumber"
              value={formData?.roomNumber}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData?.gender}
              onChange={handleInputChange}
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

export default EditBorder;
