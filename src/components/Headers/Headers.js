import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { userLogout } from "../../features/slice/userSlice";

const Headers = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutFunc = () => {
    dispatch(userLogout());
    alert("You have loged out. Hope see you soon");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand className="fw-semibold">IRFAN CATRABAS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>

          <div>
            {user && (
              <Nav.Link as={Link} to="/dashboard">
                <Button className="my-2 me-3" variant="outline-success">
                  <FontAwesomeIcon icon={faTableColumns} className="me-2" />
                  Dashboard
                </Button>
              </Nav.Link>
            )}
          </div>
          <div>
            {user ? (
              <Nav.Link as={Link} to="/account">
                <Button className="my-2 me-2" variant="outline-success">
                  {user?.name?.split(" ")[0]}
                </Button>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                <Button className="my-2  me-2" variant="outline-success">
                  Login
                </Button>
              </Nav.Link>
            )}
          </div>

          <div>
            {user && (
              <Nav.Link as={Link} to="/home"  onClick={logoutFunc} >
                <Button className="my-2" variant="outline-success">
                  <FontAwesomeIcon icon={faSignOutAlt}className="me-2" />
                  Logout
                </Button>
              </Nav.Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Headers;
