import AccountCircle from "@mui/icons-material/AccountCircle";
import AlternateEmail from "@mui/icons-material/AlternateEmail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, InputLabel, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const mdTheme = createTheme();

export default function Signup(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    showPassword: false,
    showPasswordRepeat: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowPasswordRepeat = () => {
    setValues({
      ...values,
      showPasswordRepeat: !values.showPasswordRepeat,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPasswordRepeat = (event) => {
    event.preventDefault();
  };

  const handleSignup = async () => {
    const { username, password, email } = values;
    const body = { username, password, email };
    try {
      await fetch(`http://localhost:8080/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

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
        <NavBar userRoles={props.userRoles} />
        <Toolbar />
        <Container maxWidth="sm" sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            // align="left"
            sx={{ fontWeight: "500", mb: 3 }}
            color="#292d3e"
          >
            Sign Up
          </Typography>

          <Typography
            variant="h6"
            // align="left"
            sx={{ fontWeight: "400", mb: 3 }}
            color="#292d3e"
          >
            Sign up for auran for free!
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
                <div>
                  <FormControl sx={{ width: 275, marginY: 2 }}>
                    <TextField
                      id="username"
                      label="Username"
                      value={values.username}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        setValues({ ...values, username: e.target.value });
                      }}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl sx={{ width: 275, marginY: 2 }}>
                    <TextField
                      id="email"
                      label="email"
                      type="email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AlternateEmail />
                          </InputAdornment>
                        ),
                      }}
                      value={values.email}
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                      }}
                    />
                  </FormControl>
                </div>

                <div>
                  <FormControl
                    sx={{ m: 1, width: 275, marginY: 2 }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl
                    sx={{ m: 1, width: 275, marginY: 2 }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Repeat Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPasswordRepeat ? "text" : "password"}
                      value={values.passwordRepeat}
                      onChange={handleChange("passwordRepeat")}
                      // error={true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordRepeat}
                            onMouseDown={handleMouseDownPasswordRepeat}
                            edge="end"
                          >
                            {values.showPasswordRepeat ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </div>

                <div>
                  <Button
                    color="grey"
                    variant="contained"
                    onClick={handleSignup}
                    sx={{
                      marginTop: 3,
                      color: "#d8dee9",
                      backgroundColor: "#424864",
                    }}
                  >
                    Sign Up
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
