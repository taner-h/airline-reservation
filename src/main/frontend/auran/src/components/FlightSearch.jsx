import DashboardNavBar from "./DashboardNavBar";
import FlightAddDialog from "./FlightAddDialog";
import FlightEditDialog from "./FlightEditDialog";
import update from "immutability-helper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";
import { StyledTableCell, StyledTableRow } from "./StyledTable";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import moment from "moment";

const mdTheme = createTheme();

export default function FlightSearch(props) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [flights, setFlights] = useState([]);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openSelectDialog, setOpenSelectDialog] = useState(false);
  const [info, setInfo] = useState({
    airplanes: [],
    airports: [],
  });
  const [flightClass, setFlightClass] = useState("");
  const [ticketNumber, setTicketNumber] = useState();
  const [selectedFlight, setSelectedFlight] = useState();
  const [tickets, setTickets] = useState([]);

  const { filters, setFilters } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCloseSelectDialog = () => {
    setOpenSelectDialog(false);
  };

  const handleOpenSelectDialog = (flight) => {
    setSelectedFlight(flight);
    setOpenSelectDialog(true);
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  const getInfo = async () => {
    try {
      // console.log(sortBy)

      const airplaneResponse = await fetch(
        `http://localhost:8080/airplane?pageSize=100`,
        {
          method: "GET",
        }
      );
      // console.log(response)
      const airplaneJson = await airplaneResponse.json();
      // console.log(jsonRes)
      // console.log(flights)
      // console.log(jsonRes);

      const airportResponse = await fetch(
        `http://localhost:8080/airport?pageSize=100`,
        {
          method: "GET",
        }
      );
      // console.log(response)
      const airportJson = await airportResponse.json();
      // console.log(jsonRes)
      setInfo({
        airplanes: airplaneJson.content,
        airports: airportJson.content,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getFlights = async () => {
    try {
      // console.log(sortBy)

      const response = await fetch(
        `http://localhost:8080/flight/search?page=${page - 1}&srcId=${
          filters.srcId
        }&destId=${filters.destId}&dateStart=${filters.dateStart}&dateEnd=${
          filters.dateEnd
        }&sortBy=takeoff`,
        { method: "GET" }
      );
      // console.log(response)
      const jsonRes = await response.json();
      // console.log(jsonRes)
      if (jsonRes.totalElements === 0) setOpenErrorDialog(true);
      setFlights(jsonRes.content);
      setTotalPage(jsonRes.totalPages);
      setFlightClass(filters.class);
      setTicketNumber(parseInt(filters.numberOfTickets));
      clearFilters();

      // console.log(flights)
      // console.log(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };
  const options = [
    "1A",
    "1B",
    "1C",
    "1D",
    "2A",
    "2B",
    "2C",
    "2D",
    "3A",
    "3B",
    "3C",
    "3D",
  ];

  const clearFilters = () => {
    setFilters({
      destId: "",
      srcId: "",
      dateStart: null,
      dateEnd: null,
      class: "",
      numberOfTickets: "",
    });
  };

  useEffect(() => {
    // console.log(info.airplanes.length);
    // console.log(info.airports.length);
    // setFlightChange(false);
    if (info.airplanes.length === 0 && info.airports.length === 0) {
      getInfo();
      setTickets(
        new Array(parseInt(filters.numberOfTickets)).fill({
          name: "",
          surname: "",
          age: "",
          nationalId: "",
          seat: "",
        })
      );
    }
    getFlights();
  }, [page]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        {/*<CssBaseline />*/}
        {props.isAdmin ? <DashboardNavBar /> : <NavBar />}
        <Box
          component="main"
          sx={{
            backgroundColor: "#eceff4",
            //  (theme) =>
            //   theme.palette.mode === 'light'
            //     ? theme.palette.grey[100]
            //     : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
            <Typography
              variant="h3"
              // align="left"
              sx={{ fontWeight: "500", mb: 3 }}
              color="#292d3e"
            >
              Flights
            </Typography>

            <Typography
              variant="h6"
              // align="left"
              sx={{ fontWeight: "400", mb: 3 }}
              color="#292d3e"
            >
              {/* Add, delete or edit flights. */}
            </Typography>

            <TableContainer component={Paper}>
              <Table aria-label="flights table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Flight Code</StyledTableCell>
                    <StyledTableCell align="center">From</StyledTableCell>
                    <StyledTableCell align="center">To</StyledTableCell>
                    <StyledTableCell align="center">Takeoff</StyledTableCell>
                    <StyledTableCell align="center">Duration</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights.map((flight) => (
                    <StyledTableRow
                      key={flight.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {flight.code}
                      </TableCell>
                      <TableCell align="center">
                        {flight.destinationAirport.name}
                      </TableCell>
                      <TableCell align="center">
                        {flight.sourceAirport.name}
                      </TableCell>
                      <TableCell align="center">
                        {moment(flight.takeoff).format("DD/MM/YYYY HH:mm")}
                      </TableCell>
                      <TableCell align="center">
                        {flight.duration} min
                      </TableCell>
                      <TableCell sx={{ fontWeight: "400" }} align="center">
                        {flightClass == "Economy" && flight.economyPrice}
                        {flightClass == "Business" && flight.businessPrice}$
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="grey"
                          variant="contained"
                          sx={{
                            marginY: 1,
                            color: "#d8dee9",
                            backgroundColor: "#424864",
                          }}
                          onClick={() => handleOpenSelectDialog(flight)}
                        >
                          Select
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog}>
              <DialogTitle id="alert-dialog-title">
                No flights are found with the chosen filters.
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="dialog-delete-flight">
                  Please filter your flight search again.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Link to="/" className="text-link">
                  <Button
                    //   onClick={() => handleDeleteFlight(selectedFlightToDelete)}
                    autoFocus
                  >
                    Proceed
                  </Button>
                </Link>
              </DialogActions>
            </Dialog>

            {openSelectDialog && (
              <Dialog open={openSelectDialog} onClose={handleCloseSelectDialog}>
                <DialogTitle
                  sx={{ backgroundColor: "#eceff4" }}
                  id="alert-dialog-title"
                >
                  Choose seats and enter passenger info below.
                </DialogTitle>

                <DialogContent sx={{ backgroundColor: "#eceff4" }}>
                  {tickets.map((ticket, index) => (
                    <Accordion
                      expanded={expanded === index}
                      onChange={handleChange(index)}
                      key={index}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          Passenger {index + 1}
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}>
                          Choose your seat.
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                          <FormControl
                            sx={{ width: 200, marginX: 2, marginY: 2 }}
                          >
                            <TextField
                              id="name"
                              label="Name"
                              // value={tickets[index].name}
                              onChange={(e) => {
                                setTickets(
                                  update(tickets, {
                                    [index]: { name: { $set: e.target.value } },
                                  })
                                );
                              }}
                            />
                          </FormControl>
                          <FormControl
                            sx={{ width: 200, marginX: 2, marginY: 2 }}
                          >
                            <TextField
                              id="surname"
                              label="Surname"
                              // value={tickets[index].surname}
                              onChange={(e) => {
                                setTickets(
                                  update(tickets, {
                                    [index]: {
                                      surname: { $set: e.target.value },
                                    },
                                  })
                                );
                              }}
                            />
                          </FormControl>
                        </div>
                        <div>
                          <FormControl
                            sx={{ width: 200, marginX: 2, marginY: 2 }}
                          >
                            <TextField
                              id="nationalId"
                              label="National Id"
                              // value={tickets[index].name}
                              onChange={(e) => {
                                setTickets(
                                  update(tickets, {
                                    [index]: {
                                      nationalId: { $set: e.target.value },
                                    },
                                  })
                                );
                              }}
                            />
                          </FormControl>
                          <FormControl
                            sx={{ width: 200, marginX: 2, marginY: 2 }}
                          >
                            <InputLabel id="seat">Seat</InputLabel>
                            <Select
                              id="seatSelect"
                              // value={tickets[index].seat}
                              label="Seat"
                              onChange={(e) => {
                                setTickets(
                                  update(tickets, {
                                    [index]: {
                                      seat: { $set: e.target.value },
                                    },
                                  })
                                );
                              }}
                            >
                              {options.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#eceff4" }}>
                  <Button autoFocus>Proceed</Button>
                </DialogActions>
              </Dialog>
            )}

            <Pagination
              count={totalPage}
              page={page}
              sx={{ justifyContent: "center", display: "flex", mt: 4 }}
              onChange={(event, value) => {
                setPage(value);
              }}
            />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
