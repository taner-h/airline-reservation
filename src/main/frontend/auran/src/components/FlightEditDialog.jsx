import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import DialogActions from "@mui/material/DialogActions";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { Container } from "@mui/system";

export default function FlightEditDialog(props) {
  const {
    flightEditDialogOpen,
    handleCloseFlightEditDialog,
    info,
    selectedFlightToEdit,
  } = props;

  const [flight, setFlight] = useState({
    airplane: "",
    destAirport: "",
    srcAirport: "",
    takeoff: null,
    duration: "",
    code: "",
    gate: "",
    economyPrice: "",
    businessPrice: "",
  });

  const convertFlight = () => {
    // console.log(selectedFlightToEdit);

    setFlight({
      airplane: selectedFlightToEdit.airplane.id,
      destAirport: selectedFlightToEdit.destinationAirport.id,
      srcAirport: selectedFlightToEdit.sourceAirport.id,
      takeoff: moment(selectedFlightToEdit.takeoff, "YYYY-MM-DDTHH:mm:ss"),
      duration: selectedFlightToEdit.duration,
      code: selectedFlightToEdit.code,
      gate: selectedFlightToEdit.gate,
      economyPrice: selectedFlightToEdit.economyPrice,
      businessPrice: selectedFlightToEdit.businessPrice,
    });
  };

  useEffect(() => {
    convertFlight();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      airplane,
      destAirport,
      srcAirport,
      takeoff: takeoffMoment,
      duration,
      code,
      gate,
      businessPrice,
      economyPrice,
    } = flight;

    const takeoff = moment(takeoffMoment).format("YYYY-MM-DDTHH:MM:SS");
    const body = {
      takeoff,
      duration,
      code,
      gate,
      businessPrice,
      economyPrice,
    };

    try {
      // console.log(sortBy)

      const request = await fetch(
        `http://localhost:8080/flight/${selectedFlightToEdit.id}?airplaneId=${airplane}&destId=${destAirport}&srcId=${srcAirport}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      setFlight({
        airplane: "",
        destAirport: "",
        srcAirport: "",
        takeoff: null,
        duration: "",
        code: "",
        gate: "",
        businessPrice: "",
        economyPrice: "",
      });

      props.setFlightChange(props.flightChange + 1);

      handleCloseFlightEditDialog();

      // console.log(jsonRes)

      // console.log(flights)
      // console.log(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Dialog
      open={flightEditDialogOpen}
      onClose={handleCloseFlightEditDialog}
      // fullWidth={true}
      maxWidth="lg"
    >
      <DialogTitle>Edit flight.</DialogTitle>
      <DialogContent>
        <Box sx={{ justifyContent: "center", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ width: 262, marginX: 2, marginY: 2 }}>
              <InputLabel id="from">Source Airport</InputLabel>
              <Select
                id="srcAirport"
                value={flight.srcAirport}
                label="srcAirport"
                onChange={(e) => {
                  setFlight({ ...flight, srcAirport: e.target.value });
                }}
              >
                {info.airports.map((airport) => (
                  <MenuItem key={airport.id} value={airport.id}>
                    {airport.name}, {airport.city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 262, marginX: 2, marginY: 2 }}>
              <InputLabel id="from">Destination Airport</InputLabel>
              <Select
                id="destAirport"
                value={flight.destAirport}
                label="destAirport"
                onChange={(e) => {
                  setFlight({ ...flight, destAirport: e.target.value });
                }}
              >
                {info.airports.map((airport) => (
                  <MenuItem key={airport.id} value={airport.id}>
                    {airport.name}, {airport.city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 262, marginX: 2, marginY: 2 }}>
              <InputLabel id="from">Airplane</InputLabel>
              <Select
                id="airplane"
                value={flight.airplane}
                label="airplane"
                onChange={(e) => {
                  setFlight({ ...flight, airplane: e.target.value });
                }}
              >
                {info.airplanes.map((airplane) => (
                  <MenuItem key={airplane.id} value={airplane.id}>
                    {airplane.registration}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ width: 262, marginX: 2, marginY: 2 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Takeoff"
                  id="Takeoff"
                  inputFormat="DD-MM-yyyy HH:mm:ss"
                  value={flight.takeoff}
                  onChange={(newValue) => {
                    setFlight({
                      ...flight,
                      // takeoff: moment(newValue).format("MM-DD-YYYY'T'HH:mm:ss"),
                      takeoff: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ width: 262, marginX: 2, marginY: 2 }}>
              <TextField
                id="outlined-number"
                label="Duration"
                type="number"
                value={flight.duration}
                onChange={(e) => {
                  setFlight({ ...flight, duration: e.target.value });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl sx={{ width: 262, marginX: 2, marginY: 2 }}>
              <TextField
                id="code"
                label="Flight Code"
                value={flight.code}
                onChange={(e) => {
                  setFlight({ ...flight, code: e.target.value });
                }}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ width: 262, marginX: 2, marginY: 2 }}>
              <TextField
                id="gate"
                label="Gate"
                value={flight.gate}
                onChange={(e) => {
                  setFlight({ ...flight, gate: e.target.value });
                }}
              />
            </FormControl>
            <FormControl sx={{ width: 262, marginX: 2, marginY: 2 }}>
              <TextField
                id="businessPrice"
                label="Business Class Price"
                value={flight.businessPrice}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setFlight({ ...flight, businessPrice: e.target.value });
                }}
              />
            </FormControl>

            <FormControl sx={{ width: 262, marginX: 2, marginY: 2 }}>
              <TextField
                id="economyPrice"
                label="Economy Class Price"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                value={flight.economyPrice}
                onChange={(e) => {
                  setFlight({ ...flight, economyPrice: e.target.value });
                }}
              />
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="grey"
          sx={{
            color: "white",
            backgroundColor: "#292d3e",
            marginRight: 1,
            marginBottom: 2,
          }}
          onClick={handleCloseFlightEditDialog}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="grey"
          sx={{
            color: "white",
            backgroundColor: "#292d3e",
            marginRight: 2,
            marginBottom: 2,
          }}
          onClick={handleSubmit}
        >
          Edit Flight
        </Button>
      </DialogActions>
    </Dialog>
  );
}
