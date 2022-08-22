import DashboardNavBar from "./DashboardNavBar";
import FlightAddDialog from "./FlightAddDialog";
import FlightEditDialog from "./FlightEditDialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Button from "@mui/material/Button";
import { StyledTableCell, StyledTableRow } from "./StyledTable";
import Fab from "@mui/material/Fab";
import { tableCellClasses } from "@mui/material/TableCell";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
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

export default function Airlines(props) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [airlines, setAirlines] = useState([]);

  const getAirlines = async () => {
    try {
      // console.log(sortBy)

      const response = await fetch(
        `http://localhost:8080/airline?page=${page - 1}`,
        { method: "GET" }
      );
      // console.log(response)
      const jsonRes = await response.json();
      // console.log(jsonRes)
      setAirlines(jsonRes.content);
      setTotalPage(jsonRes.totalPages);

      // console.log(flights)
      // console.log(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAirlines();
  }, [page]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
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
              Airlines
            </Typography>

            <Typography
              variant="h6"
              // align="left"
              sx={{ fontWeight: "400", mb: 3 }}
              color="#292d3e"
            >
              Add, delete or edit airlines.
            </Typography>

            <TableContainer component={Paper}>
              <Table aria-label="flights table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Website</StyledTableCell>
                    <StyledTableCell align="center">Country</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {airlines.map((airline) => (
                    <StyledTableRow
                      key={airline.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {airline.name}
                      </TableCell>
                      <TableCell align="center">{airline.website}</TableCell>
                      <TableCell align="center">
                        {airline.country.name}
                      </TableCell>
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
