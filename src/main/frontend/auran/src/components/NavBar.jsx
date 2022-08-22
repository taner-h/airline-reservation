import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import logo from "../images/logo128.png";

export default function NavBar() {
  const [profileMenuOpened, setProfileMenuOpened] = useState(false);

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
          <Link
            className="text-link"
            to="/admin"
            style={{ textDecoration: "inherit" }}
          >
            <Button color="inherit" sx={{ marginRight: 1 }}>
              Admin
            </Button>
          </Link>
          <Button color="inherit" sx={{ backgroundColor: "#424864" }}>
            Login
          </Button>

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
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
