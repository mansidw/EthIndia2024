import {
  Dropdown,
  Image,
  Nav,
  Navbar,
  Container,
  NavDropdown,
  NavLink,
  NavItem,
  Button,
} from "react-bootstrap";
import { faAngleDown, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { DEFAULT_PROFILE, PAGE_LOGO, PAGE_TITLE } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";

import { LogInWithAnonAadhaar, useAnonAadhaar, AnonAadhaarProof, useProver } from "@anon-aadhaar/react";

function PageNavbar() {
  const { login, logout, loggedIn, userInfo, publicAddress } = useAuth();
  const navLinks = [{ title: "Profile", path: "/profile" }, { title: "tmpAnon", path: "/anon" }];
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Nav.Link as={Link} to="/">
          <Navbar.Brand>
            <img
              alt=""
              src={PAGE_LOGO}
              width="30"
              height="30"
              className="d-inline-block align-top mx-2 rounded-circle"
            />
            {PAGE_TITLE}
          </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {loggedIn &&
              navLinks.map((item, i) => (
                <Nav.Item key={i}>
                  <Nav.Link as={Link} to={item.path}>
                    {item.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
          </Nav>
          <Nav>
            <Nav.Item className="mx-2 mt-2">
              <LogInWithAnonAadhaar nullifierSeed={1234} fieldsToReveal={["revealAgeAbove18", "revealPinCode", "revealGender", "revealState"]} />
            </Nav.Item>
            <Nav.Item>

              {!loggedIn && (
                <Button
                  variant="outline-primary"
                  onClick={login}
                  className="mx-2"
                >
                  Login
                </Button>
              )}
              {loggedIn && (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="mt-3">{`${publicAddress[0]?.slice(0, 6)}...${publicAddress[0]?.slice(-4)}`}</div> {" "}
                  <Dropdown as={NavItem}>
                    <Dropdown.Toggle as={NavLink} className="d-flex align-item-center" id="dropdown-basic">
                      <Image
                        src={userInfo?.profileImage ?? DEFAULT_PROFILE}
                        className="user-avatar rounded-circle"
                        height={40}
                        width={40}
                      />
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        style={{ margin: "5px 0 0 5px" }}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="fw-semibold" onClick={logout}>
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          className="text-danger me-2"
                          style={{ width: "20px" }}
                        />{" "}
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PageNavbar;
