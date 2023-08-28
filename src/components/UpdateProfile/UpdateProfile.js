import React, { useEffect, useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  updateProfileReset,
  updateUserProfile,
} from "../../features/slice/profileSlice";
import { loadUserDetails } from "../../features/slice/userSlice";

const UpdateProfile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const {isUpdated, ownError } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (ownError) {
      alert(ownError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert("Congratulations!!! Your account has been successfully updated.");
      dispatch(loadUserDetails());
      navigate("/account");
      dispatch(updateProfileReset());
    }
  }, [user, ownError, isUpdated, dispatch, navigate]);

  // On submit handler for update user
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updateData = new FormData();
    updateData.append("name", name);
    updateData.append("email", email);
    dispatch(updateUserProfile(updateData));
  };

  return (
    <div>
      <div style={{ height: "90vh" }}>
        <div
          className="d-flex justify-content-center align-items-center bg-light "
          style={{ height: "90vh" }}
        >
          <div
            style={{ width: "100%", maxWidth: "450px" }}
            className="bg-white p-3"
          >
            <div className="text-center">
            <span className="text-center px-3 pb-1 fs-4 fw-semibold text-secondary">
              Update Your Profile
            </span>
            </div>
            <br />
            <Form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
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
                  />
                </div>
              </Form.Group>

              <Button
                variant="secondary"
                type="submit"
                className="w-100 mb-2"
                disabled={isUpdated}
              >
                Update
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
