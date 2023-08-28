import React, { useEffect, useState } from "react";
import { Form, Button, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loadUserDetails,
  userLogin,
} from "../../features/slice/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  const { isLoading, isAuthenticated, ownError, rgisterSuccess } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      alert("Login Success!");
      navigate(redirect);
      dispatch(loadUserDetails());
      dispatch(clearError());
    }
    if (ownError && ownError !== "Please login to access the resource") {
      alert(ownError);
      dispatch(clearError());
    }
  }, [isAuthenticated, navigate, ownError, rgisterSuccess]);

  // On submit handeler for login user

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div style={{ height: "90vh" }}>
      <div
        className="d-flex justify-content-center align-items-center bg-light"
        style={{ height: "90vh" }}
      >
        <div
          style={{ width: "100%", maxWidth: "450px" }}
          className="bg-white p-3"
        >
          <div className="d-flex justify-content-between">
            <span className="px-3 pb-1 fs-4 fw-semibold text-secondary">
              Login
            </span>
          </div>
          <br />
          {/* For Login Section */}
          <div>
            <Form onSubmit={handleLoginSubmit}>
              {/* Input for Email */}
              <Form.Group controlId="formEmail" className="mb-2">
                <div className="input-group d-flex align-items-center fs-2 ">
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

              {/* Input of Password */}
              <Form.Group controlId="formPassword" className="mb-2">
                <div className="input-group d-flex align-items-center fs-2 ">
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
              <NavLink
                as={Link}
                to="/password/forget"
                className="text-end py-2"
              >
                <p>Forget Password?</p>
              </NavLink>
              <Button variant="secondary" type="submit" className="w-100 mb-2">
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
