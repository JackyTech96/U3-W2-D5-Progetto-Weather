import { Container, Nav, Navbar } from "react-bootstrap";
import { BrightnessHigh, List } from "react-bootstrap-icons";

const WeatherNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          Weather App
          <BrightnessHigh color="orange" className="ms-1" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <List className="fs-4" />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WeatherNavbar;
