import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteBorderData,
  fetchBorderDetails,
} from "../../features/slice/BordersSlice";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { addNewIncome } from "../../features/slice/incomeSlice";

const BorderDetails = ({ params }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { border } = useSelector((state) => state.border);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBorderDetails(id));
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    borderName: "",
    borderId: "",
    paymentType: "",
    deposit: 0,
    developmentFee: 0,
    monthlyFee: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (border) {
      formData.borderName = border?.name;
      formData.borderId = border?._id;
    }
  }, [border]);

  const handleIncomeSubmit = (event) => {
    event.preventDefault();
    dispatch(addNewIncome(formData));

    const resetFormData = {
      deposit: 0,
      monthlyFee: 0,
      developmentFee: 0,
    };
    setFormData(resetFormData);
  };

  const deleteBorderHandler = () => {
    dispatch(deleteBorderData(id));
    navigate("/borders");
  };

  return (
    <>
      <Container>
        <br />
        <h2 className="text-center border-bottom pb-2 fw-semibold">
          Details of {border?.name}
        </h2>
        <br />
        <Row xs={1} md={1} lg={3}>
          <Col>
            <div>
              <h3 className="text-success">Personal Information:</h3>
              <div>
                <span className="fw-semibold">Name : </span>
                <span>{border?.name}</span>
              </div>
              <div>
                <span className="fw-semibold">Id : </span>
                <span>{border?._id}</span>
              </div>
              <div>
                <span className="fw-semibold">Gender: </span>
                <span>{border?.gendar}</span>
              </div>
              <div>
                <span className="fw-semibold">Date of Birth:</span>
                <span>{String(border?.birthDate.substr(0, 10))}</span>
              </div>
              <div>
                <span className="fw-semibold"> Border Phone Number: </span>
                <span> {border?.borderPhoneNumber}</span>
              </div>
              <div>
                <span className="fw-semibold">Occupation : </span>
                <span>{border?.borderOccupation}</span>
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <h3 className="text-success">Family Information:</h3>
              <div>
                <span className="fw-semibold">Father's Name : </span>
                <span>{border?.fatherName}</span>
              </div>
              <div>
                <span className="fw-semibold">Mother's Name : </span>
                <span>{border?.motherName}</span>
              </div>
              <div>
                <span className="fw-semibold">Guardian's Name : </span>
                <span>{border?.guardianName}</span>
              </div>
              <div>
                <span className="fw-semibold">Relation With Guardian :</span>
                <span>{border?.relationWithGuardian}</span>
              </div>
              <div>
                <span className="fw-semibold">Guardian's Phone Number :</span>
                <span>{border?.guardianPhoneNumber}</span>
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <h3 className="text-success">Address & Others:</h3>
              <div>
                <span className="fw-semibold">Irfan Catrabas Room No : </span>
                <span>{border?.roomNumber}</span>
              </div>
              <div>
                <span className="fw-semibold">Parmanent Addres : </span>
                <span>{border?.parmanentAddress}, </span>
                <span>{border?.upazilla}, </span>
                <span>{border?.district}</span>
              </div>
              <div>
                <span className="fw-semibold">Occupational Address :</span>
                <span>{border?.occupationalAddress}</span>
              </div>
              <div>
                <span className="fw-semibold">Border Status :</span>
                <span> {border?.borderStatus}</span>
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <hr />
        <br />

        {/* Add Income */}
        <div>
          <h2 className="text-center fw-semibold">Add Deposit</h2>
          <div>
            <Form onSubmit={handleIncomeSubmit}>
              <Form.Group as={Row} controlId="formName" className="mb-3">
                <Form.Label column sm={2}>
                  Border's Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.borderName}
                    required
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formId" className="mb-3">
                <Form.Label column sm={2}>
                  Border's ID
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="id"
                    value={formData.borderId}
                    readOnly
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="paymentType" className="mb-3">
                <Form.Label column sm={2}>
                  Payment Type
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="select" // Using "as" prop to create a select dropdown
                    name="paymentType"
                    onChange={handleChange}
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
                    value={formData.deposit}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formDevelopmentFee"
                className="mb-3"
              >
                <Form.Label column sm={2}>
                  Development Fee
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    name="developmentFee"
                    value={formData.developmentFee}
                    onChange={handleChange}
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
                    value={formData.monthlyFee}
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
          <Link to={`/borderEdit/${border?._id}`}>
            <Button>Edit Border</Button>
          </Link>

          <Button onClick={deleteBorderHandler}>Delete Border</Button>

          <br />
          <br />
        </div>
      </Container>
    </>
  );
};

export default BorderDetails;
