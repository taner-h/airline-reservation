import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AirlinesIcon from "@mui/icons-material/Airlines";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightIcon from "@mui/icons-material/Flight";
import FactoryIcon from "@mui/icons-material/Factory";
import PersonIcon from "@mui/icons-material/Person";
import LuggageIcon from "@mui/icons-material/Luggage";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Link to="/admin" className="text-link">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon className="drawer-logo" />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to="/admin/flights" className="text-link">
      <ListItemButton>
        <ListItemIcon>
          <FlightTakeoffIcon className="drawer-logo" />
        </ListItemIcon>
        <ListItemText primary="Flights" />
      </ListItemButton>
    </Link>

    <Link to="/admin/tickets" className="text-link">
      <ListItemButton>
        <ListItemIcon>
          <AirplaneTicketIcon className="drawer-logo" />
        </ListItemIcon>
        <ListItemText primary="Tickets" />
      </ListItemButton>
    </Link>

    <Link to="/admin/airlines" className="text-link">
      <ListItemButton>
        <ListItemIcon>
          <AirlinesIcon className="drawer-logo" />
        </ListItemIcon>
        <ListItemText primary="Airlines" />
      </ListItemButton>
    </Link>

    <Link to="/admin/airports" className="text-link">
      <ListItemButton>
        <ListItemIcon>
          <ConnectingAirportsIcon className="drawer-logo" />
        </ListItemIcon>
        <ListItemText primary="Airports" />
      </ListItemButton>
    </Link>

    <Link to="/admin/airplanes" className="text-link">
      <ListItemButton>
        <ListItemIcon>
          <FlightIcon className="drawer-logo" />
        </ListItemIcon>
        <ListItemText primary="Airplanes" />
      </ListItemButton>
    </Link>

    <Link to="/admin/manufacturers" className="text-link">
      <ListItemButton>
        <ListItemIcon>
          <FactoryIcon className="drawer-logo" />
        </ListItemIcon>
        <ListItemText primary="Manufacturers" />
      </ListItemButton>
    </Link>

    <Link to="/admin/passengers" className="text-link">
      <ListItemButton>
        <ListItemIcon>
          <LuggageIcon className="drawer-logo" />
        </ListItemIcon>
        <ListItemText primary="Passengers" />
      </ListItemButton>
    </Link>

    <Link to="/admin/users" className="text-link">
      <ListItemButton>
        <ListItemIcon>
          <PersonIcon className="drawer-logo" />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>

    <Link to="/admin/roles" className="text-link">
      <ListItemButton>
        <ListItemIcon>
          <PsychologyIcon className="drawer-logo" />
        </ListItemIcon>
        <ListItemText primary="Roles" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon className="drawer-logo" />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon className="drawer-logo" />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon className="drawer-logo" />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
