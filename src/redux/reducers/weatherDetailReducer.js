import {
  FETCH_CURRENT_WEATHER_REQUEST,
  FETCH_CURRENT_WEATHER_SUCCESS,
  FETCH_CURRENT_WEATHER_FAILURE,
  FETCH_5_DAY_FORECAST_REQUEST,
  FETCH_5_DAY_FORECAST_SUCCESS,
  FETCH_5_DAY_FORECAST_FAILURE,
} from "../actions";

const initialState = {
  currentWeather: {
    data: null,
    loading: false,
    error: null,
  },
  fiveDayForecast: {
    data: null,
    loading: false,
    error: null,
  },
};

const weatherDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_WEATHER_REQUEST:
      return {
        ...state,
        currentWeather: {
          ...state.currentWeather,
          loading: true,
          error: null,
        },
      };

    case FETCH_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        currentWeather: {
          ...state.currentWeather,
          loading: false,
          data: action.payload,
        },
      };

    case FETCH_CURRENT_WEATHER_FAILURE:
      return {
        ...state,
        currentWeather: {
          ...state.currentWeather,
          loading: false,
          error: action.payload,
        },
      };

    case FETCH_5_DAY_FORECAST_REQUEST:
      return {
        ...state,
        fiveDayForecast: {
          ...state.fiveDayForecast,
          loading: true,
          error: null,
        },
      };

    case FETCH_5_DAY_FORECAST_SUCCESS:
      return {
        ...state,
        fiveDayForecast: {
          ...state.fiveDayForecast,
          loading: false,
          data: action.payload,
        },
      };

    case FETCH_5_DAY_FORECAST_FAILURE:
      return {
        ...state,
        fiveDayForecast: {
          ...state.fiveDayForecast,
          loading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default weatherDetailReducer;
