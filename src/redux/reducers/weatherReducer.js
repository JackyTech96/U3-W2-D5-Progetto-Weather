import { GET_WEATHER } from "../actions";

const initialState = {
  weatherData: [],
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER:
      return {
        ...state,
        weatherData: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
