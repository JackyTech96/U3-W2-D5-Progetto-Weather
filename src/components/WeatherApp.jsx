import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchWeatherData } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const WeatherApp = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.weather.weatherData);

  const handleCityClick = (city) => {
    navigate(`/weather/${city.name}`, { state: { city } });
  };

  useEffect(() => {
    dispatch(fetchWeatherData(searchValue));
  }, [searchValue, dispatch]);

  return (
    <Container className="d-flex flex-column flex-grow-1">
      <Row className="justify-content-center">
        <Col xs={11} md={8} lg={6}>
          <Form.Group className="my-5">
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
