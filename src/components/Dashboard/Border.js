import React from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

const Border = ({ border }) => {
  return (
    <Col>
      <Link style={{ textDecoration: "none" }} to={`/border/${border._id}`}>
        <Card className="p-2">
          <p className="fs-3 fw-semibold bg-success text-white p-2 mb-3 text-center">
            {border?.name}
          </p>
          <p> First entry at : {" "}
          {border?.createdAt
                    && String(border.createdAt.substr(0, 10))}
          </p>
          <p>Room Number : {border.roomNumber}</p>
          <p>Occupation : {border.borderOccupation}</p>
          <p>Occupational Address : {border.occupationalAddress}</p>
          <p>Home District : {border.district}</p>
        </Card>
      </Link>
    </Col>
  );
};

export default Border;
