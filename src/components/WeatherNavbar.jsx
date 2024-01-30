import { useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { BrightnessHigh, List } from "react-bootstrap-icons";

const WeatherNavbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary py-0">
      <Container>
        <Navbar.Brand href="#home">
          Weather App
          <BrightnessHigh color="orange" className="ms-1" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown id="basic-nav-dropdown" title={selectedLanguage}>
              <NavDropdown.Item onClick={() => handleLanguageChange("EN")}>EN</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLanguageChange("IT")}>IT</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <List className="fs-4" />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WeatherNavbar;
