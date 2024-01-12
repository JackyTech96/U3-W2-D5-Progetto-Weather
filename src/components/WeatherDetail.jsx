import { Button, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link, useLocation } from "react-router-dom";
import { Sunrise, SunsetFill } from "react-bootstrap-icons";

const API_KEY = "c63b7218c947999fed78cdcccc7adef8";

const WeatherDetails = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const city = location.state ? location.state.city : null;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (city) {
          setLoading(true);
          let resp = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
          );
          if (resp.ok) {
            let data = await resp.json();
            console.log(data);
            setWeatherData(data);
            setLoading(false);
          } else {
            console.log("error fetching weather");
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (city) {
      fetchWeather();
    }
  }, [city]);

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
              </div>
            ) : null}
          </Card>
        </Col>
      </Row>
      <div className="d-flex justify-content-center mt-3">
        <Link to={"/"}>
          <Button variant="info" className="text-white">
            Return to Search
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default WeatherDetails;
