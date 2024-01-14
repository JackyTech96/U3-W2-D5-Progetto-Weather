import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Spinner, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Sunrise, SunsetFill } from "react-bootstrap-icons";

const API_KEY = "c63b7218c947999fed78cdcccc7adef8";

const WeatherDetail = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const city = location.state ? location.state.city : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (city) {
          setLoading(true);
          let weatherResp = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
          );
          if (weatherResp.ok) {
            let weatherData = await weatherResp.json();
            setWeatherData(weatherData);
          } else {
            console.log("error fetching current weather");
          }
          let forecastResp = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
          );
          if (forecastResp.ok) {
            let forecastData = await forecastResp.json();
            const dailyForecastData = forecastData.list.filter((item, index) => index % 8 === 0);
            setForecastData(dailyForecastData);
          } else {
            console.log("error fetching 5-day forecast");
          }
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (city) {
      fetchData();
    }
  }, [city]);

  const renderForecast = () => {
    if (!forecastData) return null;
    return (
      <Row className="mt-4 justify-content-center">
        <h3 className="my-3 text-center">5-Day Forecast</h3>
        {forecastData.map((forecast, index) => (
          <Col key={`forecast-${index}`} xs={12} md={6} lg={4} xl={2} className="mb-4">
            <Card className="border-0 shadow-lg p-4">
              <Card.Body>
                <h6 className="text-center mb-3">
                  {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "numeric",
                    day: "numeric",
                  })}
                </h6>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <img
                    className="bg-info border rounded-pill me-3"
                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt="img"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <div>
                    <span className="fw-bold fs-4">{Math.round(forecast.main.temp)}°C</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const UnixSunriseTime = weatherData ? weatherData.sys.sunrise : null;
  const risedate = UnixSunriseTime ? new Date(UnixSunriseTime * 1000) : null;
  const risehours = risedate ? risedate.getHours() : null;
  const riseminutes = risedate ? risedate.getMinutes() : null;

  const UnixSunsetTime = weatherData ? weatherData.sys.sunset : null;
  const setdate = UnixSunsetTime ? new Date(UnixSunsetTime * 1000) : null;
  const sethours = setdate ? setdate.getHours() : null;
  const setminutes = setdate ? setdate.getMinutes() : null;

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card className="border-0 rounded">
            {loading ? (
              <div className="text-center m-3 border-0 rounded-0 ">
                <Spinner animation="border" variant="info" role="status" className="fs-4 text-center  "></Spinner>
              </div>
            ) : weatherData ? (
              <div>
                <Card.Body className="bg-info-subtle text-start border-0 rounded">
                  <Card.Title className="fs-2 ps-2 p-1">
                    {weatherData.name} , {weatherData.sys.country}
                  </Card.Title>
                  <div className="d-flex justify-content-center justify-content-md-start ms-md-4">
                    <img
                      className="bg-info border rounded-pill mb-2 mt-3 "
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                      alt="img"
                    ></img>
                  </div>
                  <Card.Text className="fs-3 text-center text-md-end me-md-5 my-1 fw-bold  ">
                    {weatherData.weather[0].main.toUpperCase()}
                  </Card.Text>
                  <Row className="flex-column-reverse flex-md-row ">
                    <Col>
                      <Card.Text className="fs-5 ms-5 my-5">
                        Temperature {weatherData.main.temp}°C
                        <Card.Text className="fs-6 text-secondary m-0">
                          Max Temp. {weatherData.main.temp_max} °C
                        </Card.Text>
                        <Card.Text className="fs-6 text-secondary m-0">
                          Min Temp. {weatherData.main.temp_min} °C
                        </Card.Text>
                        <Card.Text className="fs-6 text-secondary m-0">
                          Real Feel Temp {weatherData.main.feels_like} °C
                        </Card.Text>
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text className="fs-5 text-center text-md-end me-md-5">
                        {weatherData.weather[0].description}
                      </Card.Text>
                    </Col>
                  </Row>
                  <Row className="text-center fs-5">
                    <Col xs={12} sm={6}>
                      Sunrise <Sunrise className="mx-1" />
                      {risehours}:{riseminutes}
                    </Col>
                    <Col xs={12} sm={6}>
                      Sunset <SunsetFill className="mx-1" />
                      {sethours}:{setminutes}
                    </Col>
                  </Row>
                </Card.Body>
                {renderForecast()}
              </div>
            ) : null}
          </Card>
        </Col>
      </Row>
      <div className="d-flex justify-content-center mt-3 pb-3">
        <Link to={"/"}>
          <Button variant="info" className="text-white">
            Return to Search
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default WeatherDetail;
