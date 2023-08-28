import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadEntryUserDetails } from "../../features/slice/userSlice";

const Income = ({ income }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = income.user;

  useEffect(() => {
    dispatch(loadEntryUserDetails(userId));
  }, [dispatch, userId]);

  return (
    <Col>
      <Link style={{ textDecoration: "none" }} to={`/income/update/${income._id}`}>
        <Card className="p-2">
          <p> Border Name : {income?.borderName} </p>
          <p>Border id : {income.borderId}</p>
          <p>Border Type : {income.paymentType}</p>
          <hr className="m-0 p-0" />
          <p>Monthly Fee : {income.monthlyFee}</p>
          <p>Initial Deposit : {income.deposit}</p>
          <p>Development Fee: {income.developmentFee}</p>
          <hr className="m-0 p-0" />
          <p className="fs-5 fw-semibold bg-success text-white p-2 mb-3 text-center">
            Total Amount Receved{" "}
            {income.monthlyFee + income.deposit + income.developmentFee} {".00"}
          </p>
          <p>
            Payment Receved On : {" "}
            {income?.createdAt && String(income.createdAt.substr(0, 10))}
          </p>
          {income.updatedAt && <p>Slip Updated On : {String(income.updatedAt.substr(0, 10))}</p> }
          <p>Payment Receved By :{user?.name}</p>

        </Card>
      </Link>
    </Col>
  );
};

export default Income;
