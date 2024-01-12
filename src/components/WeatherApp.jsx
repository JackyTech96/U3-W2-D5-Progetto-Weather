// WeatherApp.jsx
import { useEffect, useState } from "react";
import { Container, Form, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_KEY = "c63b7218c947999fed78cdcccc7adef8";

const WeatherApp = () => {
  const [searchData, setWeatherData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    navigate(`/weather/${city.name}`, { state: { city } });
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (searchValue.trim() !== "") {
          let resp = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${API_KEY}`
          );
          if (resp.ok) {
            let data = await resp.json();
            console.log(data);
            setWeatherData(data);
          } else {
            console.log("error fetching search weather");
          }
        } else {
          setWeatherData([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherData();
  }, [searchValue]);

  return (
    <Container className="d-flex flex-column flex-grow-1">
      <h3 className="mt-4 text-white-50">Search a city here:</h3>
      <Row className="justify-content-center">
        <Col xs={11} md={8} lg={6}>
          <Form.Group>
            <Form.Control
              className="p-1 fs-5"
              type="search"
              placeholder="Search..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={11} md={8} lg={6}>
          <ListGroup className="mt-3">
            {searchData.length > 0 &&
              searchData.map((city, index) => (
                <ListGroup.Item key={`city-${index}`} onClick={() => handleCityClick(city)}>
                  {city.name}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherApp;
