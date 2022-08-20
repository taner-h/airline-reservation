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

export default function FlightAddDialog(props) {
  const { flightDialogOpen, handleCloseFlightDialog, info} =
    props;

  const [flight, setFlight] = useState({
    airplane: "",
    destAirport: "",
    srcAirport: "",
    takeoff: null,
    duration: "",
    code: "",
    gate: "",
  });

  // const [info, setInfo] = useState({
  //   airplanes: [],
  //   airports: [],
  // });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      airplane,
      destAirport,
      srcAirport,
      takeoff:takeoffMoment,
      duration,
      code,
      gate,
    } = flight;

    const takeoff = moment(takeoffMoment).format("YYYY-MM-DDTHH:MM:SS");
    const body = {
      takeoff, duration, code, gate
    }

    try {
      // console.log(sortBy)

      const response = await fetch(
        `http://localhost:8080/flight?airplaneId=${airplane}&destId=${destAirport}&srcId=${srcAirport}`,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        setFlight({
          airplane: "",
          destAirport: "",
          srcAirport: "",
          takeoff: null,
          duration: "",
          code: "",
          gate: "",
        });

        handleCloseFlightDialog();

      // console.log(jsonRes)

      // console.log(flights)
      // console.log(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  

  };

  // const getInfo = async () => {
    
  //   try {
  //     // console.log(sortBy)

  //     const airplaneResponse = await fetch(`http://localhost:8080/airplane?`, {
  //       method: "GET",
  //     });
  //     // console.log(response)
  //     const airplaneJson = await airplaneResponse.json();
  //     // console.log(jsonRes)
  //     // console.log(flights)
  //     // console.log(jsonRes);

  //     const airportResponse = await fetch(`http://localhost:8080/airport?`, {
  //       method: "GET",
  //     });
  //     // console.log(response)
  //     const airportJson = await airportResponse.json();
  //     // console.log(jsonRes)
  //     setInfo({ airplanes: airplaneJson, airports: airportJson });
  //   } catch (err) {
  //     console.error(err.message);
  //   }

    // if (selectedFlightToEdit != null)
    // {
    //   const takeoff =  moment(selectedFlightToEdit.takeoff, "YYYY-MM-DDTHH:mm:ss")
    //   const {
    //     airplane,
    //     destAirport,
    //     srcAirport,
    //     duration,
    //     code,
    //     gate
    //   } = selectedFlightToEdit;

    //   const flightToEdit = {       
    //     airplane,
    //     destAirport,
    //     srcAirport,
    //     takeoff,
    //     duration,
    //     code,
    //     gate};
      
    //   // setFlight({...flight, takeoff: newTakeoff});
    //   setFlight(flightToEdit);
    // } 
    
    // console.log(flight);

  // };

  return (
    <Dialog
      open={flightDialogOpen}
      onClose={handleCloseFlightDialog}
      // fullWidth={true}
      maxWidth="lg"
    >
      <DialogTitle>
        Add a new flight.
      </DialogTitle>
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
                  inputFormat="DD-MM-yyyy hh:mm:ss"
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
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseFlightDialog}>Cancel</Button>
        <Button onClick={handleSubmit}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
