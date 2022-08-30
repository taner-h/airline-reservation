import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo128.png";

export default function NavBar(props) {
  const [profileMenuOpened, setProfileMenuOpened] = useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [values, setValues] = React.useState({
    password: "",
    username: "",
    showPassword: false,
  });
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    props.setIsLogged(false);
    props.setUsername("");
    props.setUserRoles([]);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: values.username,
          password: values.password,
        }),
      });
      const parseRes = await response.json();

      if (parseRes.AccessToken) {
        localStorage.setItem("AccessToken", parseRes.AccessToken);
        props.setUsername(values.username);
        props.setUserRoles(parseJwt(parseRes.AccessToken).roles);
        props.setIsLogged(true);
        // console.log(parseJwt(parseRes.AccessToken).roles);
      }
      handleCloseLogin();
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleProfileMenuOpen = () => {
    setProfileMenuOpened(true);
  };
  const handleProfileMenuClose = () => {
    setProfileMenuOpened(false);
  };
  const mdTheme = createTheme();

  const renderMenu = (
    <Menu
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      //id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={profileMenuOpened}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#292d3e" }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <img
            src={logo}
            className="home-logo"
            alt="auran-logo"
            // sx={{ marginRight: 5, marginLeft:10 }}
          />
          <Typography
            variant="h6"
            align="left"
            component="div"
            color="#d8dee9"
            sx={{ marginLeft: 1, flexGrow: 1 }}
          >
            <Link
              className="text-link"
              to="/"
              style={{ textDecoration: "none" }}
            >
              auran.
            </Link>
          </Typography>

          <Link
            className="text-link"
            to="/"
            style={{ textDecoration: "inherit" }}
          >
            <Button color="inherit" sx={{ marginRight: 1 }}>
              Book flight
            </Button>
          </Link>
          {props.userRoles.includes("ADMIN") ? (
            <Link
              className="text-link"
              to="/admin"
              style={{ textDecoration: "inherit" }}
            >
              <Button color="inherit" sx={{ marginRight: 1 }}>
                Admin
              </Button>
            </Link>
          ) : (
            ""
          )}

          {props.isLogged ? (
            <Button
              color="inherit"
              sx={{ backgroundColor: "#424864" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              sx={{ backgroundColor: "#424864" }}
              onClick={handleOpenLogin}
            >
              Login
            </Button>
          )}

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Dialog
            open={openLogin}
            onClose={handleCloseLogin}
            PaperProps={{
              style: {
                backgroundColor: "#eceff4",
              },
            }}
          >
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <FormControl
                  sx={{ width: 250, marginTop: 2 }}
                  variant="standard"
                >
                  <TextField
                    id="input-with-icon-textfield"
                    label="Username"
                    value={values.email}
                    type="text"
                    onChange={(event) => {
                      setValues({ ...values, username: event.target.value });
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    // variant="standard"
                  />
                </FormControl>

                <FormControl
                  sx={{ m: 1, width: 250, marginY: 2 }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={(event) => {
                      setValues({ ...values, password: event.target.value });
                    }}
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
              </Stack>
            </DialogContent>
            <DialogActions>
              <Link to="/signup">
                <Button
                  color="grey"
                  variant="contained"
                  sx={{
                    marginRight: 1,
                    marginBottom: 1,
                    color: "#d8dee9",
                    backgroundColor: "#424864",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
              <Button
                color="grey"
                variant="contained"
                sx={{
                  marginRight: 1,
                  marginBottom: 1,
                  color: "#d8dee9",
                  backgroundColor: "#424864",
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
