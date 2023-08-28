import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <br />
      <br />
      <div className="d-flex justify-content-center align-items-center">
        <div style={{ width: "100%", maxWidth: "420px" }} className=" m-2">
          <h3 className="text-success">Profile Details</h3>
          <br />
          <div className="p-3 border border-success">
            <div>
              <h4>Full Name</h4>
              <p>{user?.name}</p>
            </div>
            <br />
            <div>
              <h4>Email</h4>
              <p>{user?.email}</p>
            </div>
            <br />
            <div>
              <h4>User Role</h4>
              <p>{user?.role}</p>
            </div>
            <br />
            <div>
              <h4>Joined On</h4>
              <p>
                {user?.createdAt
                  ? String(user.createdAt.substr(0, 10))
                  : "10/06/2023"}
              </p>
            </div>
            <br />
            <Link to="/me/update" style={{ width: "100%" }}>
              <Button className="btn btn-success text-center my-2 w-100">
                Edit Profile
              </Button>
            </Link>

            <Link to="/password/update">
              <Button className="btn btn-success w-100 text-center my-2">
                Change Password
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
