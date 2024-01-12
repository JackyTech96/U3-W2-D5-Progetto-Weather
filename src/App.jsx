import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherNavbar from "./components/WeatherNavbar";
import WeatherApp from "./components/WeatherApp";
import WeatherDetails from "./components/WeatherDetail";

function App() {
  return (
    <BrowserRouter>
      <WeatherNavbar />
      <Routes>
        <Route path="/" element={<WeatherApp />}></Route>
        <Route path="/weather/:city" element={<WeatherDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
