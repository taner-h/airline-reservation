import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import NavBar from "./NavBar";

const mdTheme = createTheme();

export default function Unauthorised(props) {
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
        <NavBar />
        <Toolbar />
        <Container maxWidth="sm" sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            // align="left"
            sx={{ fontWeight: "500", mb: 3 }}
            color="#292d3e"
          >
            401 Unauthorised
          </Typography>

          <Typography
            variant="h6"
            // align="left"
            sx={{ fontWeight: "400", mb: 3 }}
            color="#292d3e"
          >
            You're not authorised for this page.
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
              ></Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/*</Box>*/}
    </ThemeProvider>
  );
}
