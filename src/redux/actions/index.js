export const GET_WEATHER = "GET_WEATHER";
export const FETCH_CURRENT_WEATHER_REQUEST = "FETCH_CURRENT_WEATHER_REQUEST";
export const FETCH_CURRENT_WEATHER_SUCCESS = "FETCH_CURRENT_WEATHER_SUCCESS";
export const FETCH_CURRENT_WEATHER_FAILURE = "FETCH_CURRENT_WEATHER_FAILURE";

export const FETCH_5_DAY_FORECAST_REQUEST = "FETCH_5_DAY_FORECAST_REQUEST";
export const FETCH_5_DAY_FORECAST_SUCCESS = "FETCH_5_DAY_FORECAST_SUCCESS";
export const FETCH_5_DAY_FORECAST_FAILURE = "FETCH_5_DAY_FORECAST_FAILURE";

const API_KEY = "c63b7218c947999fed78cdcccc7adef8";

export const fetchWeatherData = (searchValue) => {
  return async (dispatch) => {
    try {
      if (searchValue.trim() !== "") {
        let resp = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${API_KEY}`
        );
        if (resp.ok) {
          let data = await resp.json();
          console.log(data);
          dispatch({ type: GET_WEATHER, payload: data });
        } else {
          console.log("error fetching search weather");
        }
      } else {
        dispatch({ type: GET_WEATHER, payload: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCurrentWeatherRequest = () => ({
  type: FETCH_CURRENT_WEATHER_REQUEST,
});

export const fetchCurrentWeatherSuccess = (data) => ({
  type: FETCH_CURRENT_WEATHER_SUCCESS,
  payload: data,
});

export const fetchCurrentWeatherFailure = (error) => ({
  type: FETCH_CURRENT_WEATHER_FAILURE,
  payload: error,
});

export const fetch5DayForecastRequest = () => ({
  type: FETCH_5_DAY_FORECAST_REQUEST,
});

export const fetch5DayForecastSuccess = (data) => ({
  type: FETCH_5_DAY_FORECAST_SUCCESS,
  payload: data,
});

export const fetch5DayForecastFailure = (error) => ({
  type: FETCH_5_DAY_FORECAST_FAILURE,
  payload: error,
});

export const fetchCurrentWeather = (lat, lon) => async (dispatch) => {
  dispatch(fetchCurrentWeatherRequest());
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(fetchCurrentWeatherSuccess(data));
    } else {
      throw new Error("Error fetching current weather");
    }
  } catch (error) {
    dispatch(fetchCurrentWeatherFailure(error.message));
  }
};

export const fetch5DayForecast = (lat, lon) => async (dispatch) => {
  dispatch(fetch5DayForecastRequest());
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (response.ok) {
      const data = await response.json();
      const dailyForecastData = data.list.filter((item, index) => index % 8 === 0);
      dispatch(fetch5DayForecastSuccess(dailyForecastData));
    } else {
      throw new Error("Error fetching 5-day forecast");
    }
  } catch (error) {
    dispatch(fetch5DayForecastFailure(error.message));
  }
};
