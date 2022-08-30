import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import DashboardNavBar from "./DashboardNavBar";
import { StyledTableCell, StyledTableRow } from "./StyledTable";

const mdTheme = createTheme();

export default function Airplanes(props) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [airplanes, setAirplanes] = useState([]);

  const getAirplanes = async () => {
    try {
      // console.log(sortBy)

      const response = await fetch(
        `http://localhost:8080/airplane?page=${page - 1}`,
        { method: "GET" }
      );
      // console.log(response)
      const jsonRes = await response.json();
      // console.log(jsonRes)
      setAirplanes(jsonRes.content);
      console.log(airplanes);
      console.log(jsonRes.content);
      setTotalPage(jsonRes.totalPages);

      // console.log(flights)
      // console.log(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAirplanes();
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
              Airplanes
            </Typography>

            <Typography
              variant="h6"
              // align="left"
              sx={{ fontWeight: "400", mb: 3 }}
              color="#292d3e"
            >
              Add, delete or edit airplanes.
            </Typography>

            <TableContainer component={Paper}>
              <Table aria-label="flights table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Registration Number</StyledTableCell>
                    <StyledTableCell align="center">Airline</StyledTableCell>
                    <StyledTableCell align="center">
                      Manufacturer
                    </StyledTableCell>
                    <StyledTableCell align="center">Model</StyledTableCell>
                    <StyledTableCell align="center">Type</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {airplanes.map((airplane) => (
                    <StyledTableRow
                      key={airplane.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {airplane.registration}
                      </TableCell>
                      <TableCell align="center">
                        {airplane.airline.name}
                      </TableCell>
                      <TableCell align="center">
                        {
                          airplane.airplaneModel.airplaneFamily.manufacturer
                            .name
                        }
                      </TableCell>
                      <TableCell align="center">
                        {airplane.airplaneModel.airplaneFamily.name}
                        {airplane.airplaneModel.series}
                      </TableCell>
                      <TableCell align="center">
                        {airplane.airplaneModel.airplaneType.name}
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
