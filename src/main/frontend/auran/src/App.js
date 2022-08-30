import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Airlines from "./components/Airlines";
import Airplanes from "./components/Airplanes";
import Airports from "./components/Airports";
import Dashboard from "./components/Dashboard";
import Flights from "./components/Flights";
import FlightSearch from "./components/FlightSearch";
import Homepage from "./components/Homepage";
import Manufacturers from "./components/Manufacturers";
import Passengers from "./components/Passengers";
import Signup from "./components/Signup";
import Users from "./components/Users";
import Tickets from "./components/Tickets";
import Roles from "./components/Roles";

function App() {
  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [userRoles, setUserRoles] = useState([]);

  const [filters, setFilters] = useState({
    destId: 4,
    srcId: 1,
    dateStart: "2022-08-01",
    dateEnd: "2022-08-31",
    class: "Economy",
    numberOfTickets: "3",
  });

  // const [filters, setFilters] = useState({
  //   destId: "",
  //   srcId: "",
  //   dateStart: null,
  //   dateEnd: null,
  //   class: "",
  //   numberOfTickets: "",
  // });

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      setUsername(parseJwt(token).sub);
      setUserRoles(parseJwt(token).roles);
      setIsLogged(true);
    }
  }, [isLogged]);

  return (
    <div className="App">
      <Router>
        {/*{isAdmin ? <DashboardNavBar /> : <NavBar />}*/}
        <Routes>
          <Route
            path="/admin"
            element={
              userRoles.includes("ADMIN") ? (
                <Dashboard
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setUsername={setUsername}
                  setUserRoles={setUserRoles}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/signup"
            element={<Signup userRoles={userRoles} page="signup" />}
          />
          <Route
            path="/"
            element={
              <Homepage
                filters={filters}
                setFilters={setFilters}
                isLogged={isLogged}
                setUsername={setUsername}
                setUserRoles={setUserRoles}
                userRoles={userRoles}
                setIsLogged={setIsLogged}
                page="login"
              />
            }
          />
          <Route
            path="/admin/flights"
            element={
              userRoles.includes("ADMIN") ? (
                <Flights
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setUsername={setUsername}
                  setUserRoles={setUserRoles}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/search"
            element={
              <FlightSearch
                setIsLogged={setIsLogged}
                isLogged={isLogged}
                setUsername={setUsername}
                setUserRoles={setUserRoles}
                setFilters={setFilters}
                filters={filters}
                userRoles={userRoles}
              />
            }
          />
          <Route
            path="/admin/tickets"
            element={
              userRoles.includes("ADMIN") ? (
                <Tickets
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setUsername={setUsername}
                  setUserRoles={setUserRoles}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/airlines"
            element={
              userRoles.includes("ADMIN") ? (
                <Airlines
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setUsername={setUsername}
                  setUserRoles={setUserRoles}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/airports"
            element={
              userRoles.includes("ADMIN") ? (
                <Airports
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setUsername={setUsername}
                  setUserRoles={setUserRoles}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/airplanes"
            element={
              userRoles.includes("ADMIN") ? (
                <Airplanes
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setUsername={setUsername}
                  setUserRoles={setUserRoles}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/manufacturers"
            element={
              userRoles.includes("ADMIN") ? (
                <Manufacturers
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setUsername={setUsername}
                  setUserRoles={setUserRoles}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/passengers"
            element={
              userRoles.includes("ADMIN") ? (
                <Passengers
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setUsername={setUsername}
                  setUserRoles={setUserRoles}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/users"
            element={
              userRoles.includes("ADMIN") ? (
                <Users
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setUsername={setUsername}
                  setUserRoles={setUserRoles}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/roles"
            element={
              userRoles.includes("ADMIN") ? (
                <Roles
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setUsername={setUsername}
                  setUserRoles={setUserRoles}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
