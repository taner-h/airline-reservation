import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import { StyledTableCell, StyledTableRow } from "./StyledTable";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import moment from "moment";

import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount, seat) {
  return { id, date, name, shipTo, paymentMethod, amount, seat };
}

const rows = [
  createData(
    0,
    moment().format("MMM Do YYYY, HH:mm"),
    "Elvis Presley",
    "AS42G6",
    "VISA ⠀•••• 3719",
    120.0,
    "12A"
  ),
  createData(
    1,
    moment().format("MMM Do YYYY, HH:mm"),
    "Paul McCartney",
    "7F9GA4",
    "VISA ⠀•••• 2574",
    66.99,
    "32C"
  ),
  createData(
    2,
    moment().format("MMM Do YYYY, HH:mm"),
    "Tom Scholz",
    "F8DS09",
    "MC ⠀•••• 1253",
    100.7,
    "43F"
  ),
  createData(
    3,
    moment().format("MMM Do YYYY, HH:mm"),
    "Michael Jackson",
    "DS8S08",
    "AMEX ⠀•••• 2000",
    96.0,
    "16A"
  ),
  createData(
    4,
    moment().format("MMM Do YYYY, HH:mm"),
    "Bruce Springsteen",
    "FDS8H9",
    "VISA ⠀•••• 5919",
    212.0,
    "22C"
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Typography
        component="h2"
        variant="h5"
        // color="primary"
        sx={{ color: "#3b4252", fontWeight: "500" }}
        gutterBottom
      >
        Recent Tickets Sold
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow className="table-text">
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Flight</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Seat</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.seat}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Button
          color="grey"
          variant="contained"
          sx={{
            marginTop: 2,
            color: "#d8dee9",
            backgroundColor: "#424864",
          }}
        >
          See More
        </Button>
      </div>
    </React.Fragment>
  );
}
