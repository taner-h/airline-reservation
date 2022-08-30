import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Container,
  FormControl,
  InputLabel,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import update from "immutability-helper";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { StyledTableCell, StyledTableRow } from "./StyledTable";

const mdTheme = createTheme();

export default function FlightSearch(props) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [flights, setFlights] = useState([]);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openSelectDialog, setOpenSelectDialog] = useState(false);
  const [openSummaryDialog, setOpenSummaryDialog] = useState(false);
  const [info, setInfo] = useState({
    airplanes: [],
    airports: [],
  });
  const [flightClass, setFlightClass] = useState("");
  const [ticketNumber, setTicketNumber] = useState();
  const [selectedFlight, setSelectedFlight] = useState();
  const [availableBusinessSeats, setAvailableBusinessSeats] = useState([]);
  const [availableEconomySeats, setAvailableEconomySeats] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ticketsFull, setTicketsFull] = useState(false);
  const [passengers, setPassengers] = useState([]);

  const { filters, setFilters } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCloseSelectDialog = () => {
    setOpenSelectDialog(false);
    // setTicketsEmpty();
  };

  const handleOpenSelectDialog = async (flight) => {
    setSelectedFlight(flight);
    const businessSeats = generateAllSeats(
      flight.airplane.airplaneModel.businessSeatRow,
      flight.airplane.airplaneModel.businessSeatColumn
    );

    const economySeats = generateAllSeats(
      flight.airplane.airplaneModel.economySeatRow,
      flight.airplane.airplaneModel.economySeatColumn
    );

    const takenBusinessSeats = await getTakenBusinessSeats(flight.id);
    const takenEconomySeats = await getTakenEconomySeats(flight.id);

    setAvailableBusinessSeats(
      calculateAvailableSeats(businessSeats, takenBusinessSeats)
    );
    setAvailableEconomySeats(
      calculateAvailableSeats(economySeats, takenEconomySeats)
    );

    setOpenSelectDialog(true);
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  const handleCloseSummaryDialog = () => {
    setOpenSummaryDialog(false);
  };

  const handleOpenSummaryDialog = () => {
    setOpenSummaryDialog(true);
  };

  const ticketsHaveEmptyValue = () => {
    for (var ticket in tickets) {
      for (var item in tickets[ticket]) {
        // console.log(tickets[ticket][item]);
        // console.log(tickets[ticket][item]);
        if (tickets[ticket][item] == null || tickets[ticket][item] == "")
          return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setTicketsFull(!ticketsHaveEmptyValue());
  }, [tickets]);

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

  const calculateCost = () => {
    if (flightClass === "Economy")
      return ticketNumber * selectedFlight.economyPrice;
    else return ticketNumber * selectedFlight.businessPrice;
  };

  const setTicketsEmpty = () => {
    setTickets(
      new Array(parseInt(ticketNumber)).fill({
        name: "",
        surname: "",
        dob: null,
        gender: "",
        nationalId: "",
        seat: "",
      })
    );
  };

  const checkIfPassengerExist = async (nationalId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/passenger/nationalId/${nationalId}`,
        {
          method: "GET",
        }
      );

      const responseJson = await response.json();
      if (responseJson) return responseJson;
      else return false;
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTakenEconomySeats = async (flightId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/flight/${flightId}/economy`,
        {
          method: "GET",
        }
      );
      // console.log(response);
      const responseJson = await response.json();
      // console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTakenBusinessSeats = async (flightId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/flight/${flightId}/business`,
        {
          method: "GET",
        }
      );

      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePassengerSubmit = () => {
    tickets.map(async (ticket) => {
      let response = await checkIfPassengerExist(ticket.nationalId);
      if (response) setPassengers((passengers) => [...passengers, response]);
      else {
        const body = {
          name: ticket.name,
          surname: ticket.surname,
          nationalId: ticket.nationalId,
          pnr: Array.from(Array(8), () =>
            Math.floor(Math.random() * 36)
              .toString(36)
              .toUpperCase()
          ).join(""),
        };

        try {
          const request = await fetch(
            `http://localhost:8080/passenger?genderId=${ticket.gender}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );

          const response = await request.json();

          setPassengers((passengers) => [...passengers, response]);
        } catch (error) {}
      }
    });
    handleCloseSelectDialog();
    handleOpenSummaryDialog();
  };

  const handleSubmitPayment = () => {
    tickets.map(async (ticket, index) => {
      const body = {
        eticket: Array.from(Array(8), () =>
          Math.floor(Math.random() * 36)
            .toString(36)
            .toUpperCase()
        ).join(""),
        seat: ticket.seat,
        flightClass,
        price:
          flightClass === "Economy"
            ? selectedFlight.economyPrice
            : selectedFlight.businessPrice,
      };

      try {
        const response = await fetch(
          `http://localhost:8080/ticket?flightId=${selectedFlight.id}&passengerId=${passengers[index].id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
      } catch (err) {
        console.error(err.message);
      }
    });

    handleCloseSummaryDialog();
  };

  const generateAllSeats = (row, column) => {
    const letters = new Array(column)
      .fill(1)
      .map((_, i) => String.fromCharCode(65 + i));

    const numbers = Array.from({ length: row }, (_, i) => i + 1);
    const arr = [];

    numbers.forEach((number) => {
      letters.forEach((letter) => {
        arr.push(number + letter);
      });
    });

    return arr;
  };

  const calculateAvailableSeats = (arr1, arr2) => {
    return arr1
      .concat(arr2)
      .filter((item) => !arr1.includes(item) || !arr2.includes(item));
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
          dob: null,
          gender: "",
          nationalId: "",
          seat: "",
        })
      );

      // setPassengers();
      // setTicketsEmpty();
    }
    getFlights();
  }, [page]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        {/*<CssBaseline />*/}
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
          <NavBar
            userRoles={props.userRoles}
            isLogged={props.isLogged}
            setIsLogged={props.setIsLogged}
            setUsername={props.setUsername}
            setUserRoles={props.setUserRoles}
          />

          <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
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
                    sx={{ marginBottom: 2, marginRight: 2 }}
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
                              value={tickets[index].name}
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
                              value={tickets[index].surname}
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
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                              id="genderSelect"
                              value={tickets[index].gender}
                              label="Gender"
                              onChange={(e) => {
                                setTickets(
                                  update(tickets, {
                                    [index]: {
                                      gender: { $set: e.target.value },
                                    },
                                  })
                                );
                              }}
                            >
                              <MenuItem key={"M"} value={"M"}>
                                Male
                              </MenuItem>
                              <MenuItem key={"F"} value={"F"}>
                                Female
                              </MenuItem>
                              <MenuItem key={"N"} value={"N"}>
                                Non-Binary
                              </MenuItem>
                            </Select>
                          </FormControl>

                          <FormControl
                            sx={{ width: 200, marginX: 2, marginY: 2 }}
                          >
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                              <DatePicker
                                label="Date of Birth"
                                id="dob"
                                inputFormat="DD-MM-yyyy"
                                value={tickets[index].dob}
                                onChange={(e) => {
                                  setTickets(
                                    update(tickets, {
                                      [index]: {
                                        dob: { $set: e },
                                      },
                                    })
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </div>
                        <div>
                          <FormControl
                            sx={{ width: 200, marginX: 2, marginY: 2 }}
                          >
                            <TextField
                              id="nationalId"
                              label="National Id"
                              value={tickets[index].nationalId}
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
                              value={tickets[index].seat}
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
                              {flightClass === "Business"
                                ? availableBusinessSeats.map((seat) => (
                                    <MenuItem key={seat} value={seat}>
                                      {seat}
                                    </MenuItem>
                                  ))
                                : availableEconomySeats.map((seat) => (
                                    <MenuItem key={seat} value={seat}>
                                      {seat}
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
                  <Button
                    disabled={!ticketsFull}
                    color="grey"
                    variant="contained"
                    onClick={() => handlePassengerSubmit()}
                    sx={{
                      marginBottom: 2,
                      marginRight: 2,
                      color: "#d8dee9",
                      backgroundColor: "#424864",
                    }}
                  >
                    Proceed
                  </Button>
                </DialogActions>
              </Dialog>
            )}
            {openSummaryDialog && (
              <Dialog
                open={openSummaryDialog}
                onClose={handleCloseSummaryDialog}
              >
                <DialogTitle
                  sx={{ backgroundColor: "#eceff4" }}
                  id="alert-dialog-title"
                >
                  Payment
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: "#eceff4" }}>
                  Total cost: {calculateCost()}$
                  <Divider sx={{ marginY: 2, backgroundColor: "#eceff4" }} />
                  <div>
                    <TextField
                      label="Card Number"
                      sx={{ width: 240, marginX: 2, marginY: 1 }}
                      id="outlined-start-adornment"
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CreditCardIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      sx={{ width: 240, marginX: 2, marginY: 1 }}
                      id="name"
                      label="Name Surname"
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: 240, marginX: 2, marginY: 1 }}
                      id="expireDate"
                      label="Expire Date"
                      variant="outlined"
                    />

                    <TextField
                      sx={{ width: 240, marginX: 2, marginY: 1 }}
                      id="csv"
                      label="CSV"
                      variant="outlined"
                    />
                  </div>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#eceff4" }}>
                  <Button
                    color="grey"
                    variant="contained"
                    onClick={handleSubmitPayment}
                    sx={{
                      marginBottom: 2,
                      marginRight: 2,
                      color: "#d8dee9",
                      backgroundColor: "#424864",
                    }}
                  >
                    Proceed
                  </Button>
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
