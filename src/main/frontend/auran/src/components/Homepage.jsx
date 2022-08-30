import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const mdTheme = createTheme();

export default function Homepage(props) {
  const [airports, setAirports] = useState([]);
  const { filters, setFilters } = props;
  const [filterIsFull, setFilterIsFull] = useState(false);

  // const navigate = useNavigate();

  const getAirports = async () => {
    try {
      const airportResponse = await fetch(
        `http://localhost:8080/airport?pageSize=100`,
        {
          method: "GET",
        }
      );
      // console.log(response)
      const airportJson = await airportResponse.json();
      // console.log(jsonRes)
      setAirports(airportJson.content);
    } catch (err) {
      console.error(err.message);
    }
  };

  const filterHasEmptyValue = () => {
    // Object.keys(filters).forEach((filter) => {
    //   if (filter === "" || filter === null) return false;
    // });
    // return true;

    for (var filter in filters) {
      if (filters[filter] == null || filters[filter] == "") return true;
    }
    return false;
  };

  useEffect(() => {
    if (airports.length === 0) getAirports();
    // console.log(info.airplanes.length);
    setFilterIsFull(!filterHasEmptyValue());
  }, [filters]);

  return (
    <ThemeProvider theme={mdTheme}>
      {/*<Box sx={{ display: 'flex' }}>*/}
      <CssBaseline />
      {/*<NavBar />*/}
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
          setUsername={props.setUsername}
          setUserRoles={props.setUserRoles}
          setIsLogged={props.setIsLogged}
          isLogged={props.isLogged}
          page="login"
          userRoles={props.userRoles}
        />
        <Toolbar />
        <Container maxWidth="md" sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            // align="left"
            sx={{ fontWeight: "500", mb: 3 }}
            color="#292d3e"
          >
            Book flight
          </Typography>

          <Typography
            variant="h6"
            // align="left"
            sx={{ fontWeight: "400", mb: 3 }}
            color="#292d3e"
          >
            Filter and search your flight below.
          </Typography>

          <Grid container spacing={3}>
            {/* Recent Deposits */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 6,
                  display: "flex",
                  flexDirection: "column",
                  // backgroundColor: "#292d3e",
                  // color: "#d8dee9"
                }}
              >
                {/* <Typography
                  component="h2"
                  variant="h5"
                  // color="primary"
                  sx={{ color: "#3b4252", fontWeight: "500" }}
                  gutterBottom
                >
                  Book a flight
                </Typography> */}

                <div>
                  <FormControl sx={{ width: 300, marginX: 2, marginY: 2 }}>
                    <InputLabel id="from">From</InputLabel>
                    <Select
                      id="from"
                      value={filters.srcId}
                      label="From"
                      onChange={(e) => {
                        setFilters({ ...filters, srcId: e.target.value });
                      }}
                    >
                      {airports.map((airport) => (
                        <MenuItem key={airport.id} value={airport.id}>
                          {airport.name}, {airport.city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ width: 300, marginX: 2, marginY: 2 }}>
                    <InputLabel id="to">To</InputLabel>
                    <Select
                      id="to"
                      value={filters.destId}
                      label="To"
                      onChange={(e) => {
                        setFilters({ ...filters, destId: e.target.value });
                      }}
                    >
                      {airports.map((airport) => (
                        <MenuItem key={airport.id} value={airport.id}>
                          {airport.name}, {airport.city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <FormControl sx={{ width: 300, marginX: 2, marginY: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        label="Date Start"
                        id="dateStart"
                        // minDate={moment().format("DD/MM/yyyy")}
                        inputFormat="DD/MM/yyyy"
                        value={filters.dateStart}
                        onChange={(newValue) => {
                          setFilters({
                            ...filters,
                            dateStart: moment(newValue).format("YYYY-MM-DD"),
                          });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>

                  <FormControl sx={{ width: 300, marginX: 2, marginY: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        label="Date End"
                        id="dateEnd"
                        inputFormat="DD/MM/yyyy"
                        value={filters.dateEnd}
                        onChange={(newValue) => {
                          setFilters({
                            ...filters,
                            dateEnd: moment(newValue).format("YYYY-MM-DD"),
                          });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </div>

                <div>
                  <FormControl sx={{ width: 300, marginX: 2, marginY: 2 }}>
                    <InputLabel id="to">Flight Class</InputLabel>
                    <Select
                      id="class"
                      value={filters.class}
                      label="Flight Class"
                      onChange={(e) => {
                        setFilters({ ...filters, class: e.target.value });
                      }}
                    >
                      <MenuItem key="Business" value="Business">
                        Business
                      </MenuItem>
                      <MenuItem key="Economy" value="Economy">
                        Economy
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ width: 300, marginX: 2, marginY: 2 }}>
                    {/* <InputLabel id="to">Number of Tickets</InputLabel> */}
                    <TextField
                      id="ticketNumber"
                      label="Number of Tickets"
                      type="number"
                      value={filters.numberOfTickets}
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          numberOfTickets: e.target.value,
                        });
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </div>

                <div>
                  <Button
                    disabled={!filterIsFull}
                    color="grey"
                    variant="contained"
                    // onClick={navigate("/search")}
                    sx={{
                      marginTop: 3,
                      color: "#d8dee9",
                      backgroundColor: "#424864",
                    }}
                  >
                    {filterIsFull ? (
                      <Link to="/search" className="text-link">
                        Search
                      </Link>
                    ) : (
                      "Search"
                    )}
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/*</Box>*/}
    </ThemeProvider>
  );
}
