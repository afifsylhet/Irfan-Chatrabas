import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadEntryUserDetails } from "../../features/slice/userSlice";

const Expence = ({ expence }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <Col>
      <Link
        style={{ textDecoration: "none" }}
        to={`/expence/update/${expence._id}`}
      >
        <Card className="p-2">
          <p> Expence Id : {expence._id} </p>
          <p>
            Expence On :{" "}
            {expence?.createdAt && String(expence.createdAt.substr(0, 10))}
          </p>
          <p>Expence Category : {expence.category}</p>
          <p>Expense Details : {expence.expenseDetails}</p>
          <p>Expence Amount : {expence.totalAmount}</p>
          <p>Expence Entry By : {expence.entryBy}</p>
        </Card>
      </Link>
    </Col>
  );
};

export default Expence;
