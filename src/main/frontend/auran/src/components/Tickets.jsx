import DashboardNavBar from "./DashboardNavBar";
import { styled } from "@mui/material/styles";
import FlightAddDialog from "./FlightAddDialog";
import { StyledTableCell, StyledTableRow } from "./StyledTable";
import FlightEditDialog from "./FlightEditDialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import { tableCellClasses } from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
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

export default function Tickets(props) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
      // console.log(sortBy)

      const response = await fetch(
        `http://localhost:8080/ticket?page=${page - 1}`,
        { method: "GET" }
      );
      // console.log(response)
      const jsonRes = await response.json();
      // console.log(jsonRes)
      setTickets(jsonRes.content);
      setTotalPage(jsonRes.totalPages);

      // console.log(flights)
      // console.log(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTickets();
  }, [page]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <DashboardNavBar
          isLogged={props.isLogged}
          setIsLogged={props.setIsLogged}
          setUsername={props.setUsername}
          setUserRoles={props.setUserRoles}
        />
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
              Tickets
            </Typography>

            <Typography
              variant="h6"
              // align="left"
              sx={{ fontWeight: "400", mb: 3 }}
              color="#292d3e"
            >
              Add, delete or edit tickets.
            </Typography>

            <TableContainer component={Paper}>
              <Table aria-label="flights table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>E-ticket Number</StyledTableCell>
                    <StyledTableCell align="center">
                      Flight Code
                    </StyledTableCell>
                    <StyledTableCell align="center">Passenger</StyledTableCell>
                    <StyledTableCell align="center">PNR</StyledTableCell>
                    <StyledTableCell align="center">Class</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Seat</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((ticket) => (
                    <StyledTableRow
                      key={ticket.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {ticket.eticket}
                      </TableCell>
                      <TableCell align="center">{ticket.flight.code}</TableCell>
                      <TableCell align="center">
                        {ticket.passenger.name} {ticket.passenger.surname}
                      </TableCell>
                      <TableCell align="center">
                        {ticket.passenger.pnr}
                      </TableCell>
                      <TableCell align="center">{ticket.flightClass}</TableCell>
                      <TableCell align="center">{ticket.price}</TableCell>
                      <TableCell align="center">{ticket.seat}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="large"
                          edge="end"
                          aria-label="delete flight"
                          aria-haspopup="true"
                          // onClick={() => handleClickOpenDialog(flight.id)}
                          // color="inherit"
                          sx={{ color: "#292d3e" }}
                        >
                          <DeleteIcon />
                        </IconButton>{" "}
                        <IconButton
                          size="large"
                          edge="end"
                          aria-label="account of current user"
                          aria-haspopup="true"
                          // onClick={() => handleOpenFlightEditDialog(flight.id)}
                          color="inherit"
                          sx={{ color: "#292d3e" }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Pagination
              count={totalPage}
              page={page}
              sx={{ justifyContent: "center", display: "flex", mt: 4 }}
              onChange={(event, value) => {
                setPage(value);
              }}
            />
          </Container>
          <Fab
            sx={{
              backgroundColor: "#292d3e",
              right: 40,
              bottom: 40,
              position: "fixed",
            }}
            color="primary"
            aria-label="add"
            //   onClick={handleOpenFlightAddDialog}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
