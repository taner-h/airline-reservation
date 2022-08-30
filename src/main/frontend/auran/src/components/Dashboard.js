import React, { useState, Fragment } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import DashboardNavBar from "./DashboardNavBar";
import NavBar from "./NavBar";

const mdTheme = createTheme();

export default function Dashboard(props) {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
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
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 9 }}>
            <Typography
              variant="h3"
              // align="left"
              sx={{ fontWeight: "500", mb: 3 }}
              color="#292d3e"
            >
              Dashboard
            </Typography>

            <Typography
              variant="h6"
              // align="left"
              sx={{ fontWeight: "400", mb: 3 }}
              color="#292d3e"
            >
              View statistics and summary.
            </Typography>
            <Grid container spacing={3}>
              {/* Recent Deposits */}
              <Grid item xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Fragment>
                    <Typography
                      component="h2"
                      variant="h5"
                      // color="primary"
                      sx={{ color: "#3b4252", fontWeight: "500" }}
                      gutterBottom
                    >
                      Total Flights
                    </Typography>
                    <Typography component="p" variant="h4" sx={{ marginY: 3 }}>
                      7,372
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ mTop: 2, flex: 1, color: "#4c566a" }}
                    >
                      This Month
                    </Typography>
                    <div>
                      <Button
                        color="grey"
                        variant="contained"
                        sx={{
                          // marginY: 1,
                          color: "#d8dee9",
                          backgroundColor: "#424864",
                        }}
                      >
                        See More
                      </Button>
                    </div>
                  </Fragment>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Fragment>
                    <Typography
                      component="h2"
                      variant="h5"
                      // color="primary"
                      sx={{ color: "#3b4252", fontWeight: "500" }}
                      gutterBottom
                    >
                      Total Tickets Sold
                    </Typography>
                    <Typography component="p" variant="h4" sx={{ marginY: 3 }}>
                      452,083
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ mTop: 2, flex: 1, color: "#4c566a" }}
                    >
                      This Month
                    </Typography>
                    <div>
                      <Button
                        color="grey"
                        variant="contained"
                        sx={{
                          // marginY: 1,
                          color: "#d8dee9",
                          backgroundColor: "#424864",
                        }}
                      >
                        See More
                      </Button>
                    </div>
                  </Fragment>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Fragment>
                    <Typography
                      component="h2"
                      variant="h5"
                      // color="primary"
                      sx={{ color: "#3b4252", fontWeight: "500" }}
                      gutterBottom
                    >
                      Revenue
                    </Typography>
                    <Typography component="p" variant="h4" sx={{ marginY: 3 }}>
                      3,240,139.59$
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ mTop: 2, flex: 1, color: "#4c566a" }}
                    >
                      This Month
                    </Typography>
                    <div>
                      <Button
                        color="grey"
                        variant="contained"
                        sx={{
                          // marginY: 1,
                          color: "#d8dee9",
                          backgroundColor: "#424864",
                        }}
                      >
                        See More
                      </Button>
                    </div>
                  </Fragment>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    // backgroundColor: "#292d3e",
                    // color: "#d8dee9"
                  }}
                >
                  <Orders />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Fragment>
                    <Typography
                      component="h2"
                      variant="h5"
                      // color="primary"
                      sx={{ color: "#3b4252", fontWeight: "500" }}
                      gutterBottom
                    >
                      Total Passengers
                    </Typography>
                    <Typography component="p" variant="h4" sx={{ marginY: 3 }}>
                      397,425
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ mTop: 2, flex: 1, color: "#4c566a" }}
                    >
                      This Month
                    </Typography>
                    <div>
                      <Button
                        color="grey"
                        variant="contained"
                        sx={{
                          // marginY: 1,
                          color: "#d8dee9",
                          backgroundColor: "#424864",
                        }}
                      >
                        See More
                      </Button>
                    </div>
                  </Fragment>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
