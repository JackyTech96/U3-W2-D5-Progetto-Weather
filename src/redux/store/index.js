import { combineReducers, configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../reducers/weatherReducer";
import weatherDetailReducer from "../reducers/weatherDetailReducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
  detail: weatherDetailReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
