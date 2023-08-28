import React, { useEffect, useState } from "react";
import { Form, Button, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loadUserDetails,
  userRegistration,
} from "../../features/slice/userSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  const { isAuthenticated, ownError, registarSuccess} = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (ownError && ownError !== "Please login to access the resource") {
      alert(ownError);
      dispatch(clearError());
    }
    if (registarSuccess) {
      alert("Congratulations!!! Your account has been successfully created.");
      navigate("/allUsers");
      dispatch(loadUserDetails());
      dispatch(clearError());
    }
  }, [isAuthenticated, navigate, ownError, registarSuccess]);

  // On submit handeler for register user

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const registerData = new FormData();
    registerData.append("name", name);
    registerData.append("email", email);
    registerData.append("password", password);

    // Perform registration logic here
    dispatch(userRegistration(registerData));

    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div style={{ height: "90vh" }}>
      <div
        className="d-flex justify-content-center align-items-center bg-light "
        style={{ height: "90vh" }}
      >
        <div
          style={{ width: "100%", maxWidth: "450px" }}
          className="bg-white p-3"
        >
          <div className="d-flex justify-content-between">
            <span className="px-3 pb-1 fs-4 fw-semibold text-secondary">
              Register
            </span>
          </div>
          <br />

          {/* Register Section */}
          <div>
            <Form onSubmit={handleRegisterSubmit} encType="multipart/form-data">
              {/* Name */}
              <Form.Group controlId="formName" className="mb-2">
                <div className="input-group d-flex align-items-center fs-2">
                  <div className="input-group-prepend">
                    <span className="pe-2">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>
              {/* Email */}
              <Form.Group controlId="formEmail" className="mb-2">
                <div className="input-group d-flex align-items-center fs-2">
                  <div className="input-group-prepend">
                    <span className="pe-2">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>
              {/* Password */}
              <Form.Group controlId="formPassword" className="mb-2">
                <div className="input-group d-flex align-items-center fs-2">
                  <div className="input-group-prepend">
                    <span className="pe-2">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>
                       
              {/* Register Button */}
              <Button variant="secondary" type="submit" className="w-100 mb-2">
                {" "}
                Register{" "}
              </Button>{" "}
            </Form>{" "}
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Register;
