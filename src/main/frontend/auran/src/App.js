import "./App.css";
import NavBar from "./components/NavBar";
import DashboardNavBar from "./components/DashboardNavBar";
import Dashboard from "./components/Dashboard";
import Airlines from "./components/Airlines";
import Manufacturers from "./components/Manufacturers";
import Airports from "./components/Airports";
import FlightSearch from "./components/FlightSearch";
import Airplanes from "./components/Airplanes";
import Passengers from "./components/Passengers";
import Tickets from "./components/Tickets";
import Flights from "./components/Flights";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Homepage from "./components/Homepage";

function App() {
  const [isAdmin, setIsAdmin] = React.useState(true);
  const [filters, setFilters] = useState({
    destId: "",
    srcId: "",
    dateStart: null,
    dateEnd: null,
    class: "",
    numberOfTickets: 1,
  });

  return (
    <div className="App">
      <Router>
        {/*{isAdmin ? <DashboardNavBar /> : <NavBar />}*/}
        <Routes>
          <Route path="/admin" element={<Dashboard isAdmin={isAdmin} />} />
          <Route
            path="/"
            element={
              <Homepage
                filters={filters}
                setFilters={setFilters}
                isAdmin={isAdmin}
              />
            }
          />
          <Route
            path="/admin/flights"
            element={<Flights isAdmin={isAdmin} />}
          />
          <Route
            path="/search"
            element={
              <FlightSearch
                isAdmin={isAdmin}
                setFilters={setFilters}
                filters={filters}
              />
            }
          />
          <Route
            path="/admin/tickets"
            element={<Tickets isAdmin={isAdmin} />}
          />
          <Route
            path="/admin/airlines"
            element={<Airlines isAdmin={isAdmin} />}
          />
          <Route
            path="/admin/airports"
            element={<Airports isAdmin={isAdmin} />}
          />
          <Route
            path="/admin/airplanes"
            element={<Airplanes isAdmin={isAdmin} />}
          />
          <Route
            path="/admin/manufacturers"
            element={<Manufacturers isAdmin={isAdmin} />}
          />
          <Route
            path="/admin/passengers"
            element={<Passengers isAdmin={isAdmin} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
