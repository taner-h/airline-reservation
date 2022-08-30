import React, { Fragment, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import { Switch } from "@mui/material";
import logo from "../images/logo128.png";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export default function DashboardNavBar(props) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    props.setIsLogged(false);
    props.setUsername("");
    props.setUserRoles([]);
    navigate("/");
  };

  const [profileMenuOpened, setProfileMenuOpened] = useState(false);

  const handleProfileMenuOpen = () => {
    setProfileMenuOpened(true);
  };
  const handleProfileMenuClose = () => {
    setProfileMenuOpened(false);
  };

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

  const renderDrawer = (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: "#242837",
          color: "#d8dee9",
        },
      }}
      variant="permanent"
      open={open}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon className="drawer-logo" />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        {/* <Divider sx={{ my: 1 }} />
        {secondaryListItems} */}
      </List>
    </Drawer>
  );

  return (
    // <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{ backgroundColor: "#292d3e" }}
        open={open}
      >
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
              color: "#d8dee9",
            }}
          >
            <MenuIcon />
          </IconButton>

          <img src={logo} className="logo" alt="auran-logo" />
          <Typography
            variant="h6"
            align="left"
            component="div"
            color="#d8dee9"
            sx={{ marginLeft: 1, flexGrow: 1 }}
          >
            <RouteLink
              className="text-link"
              to="/"
              style={{ textDecoration: "none" }}
            >
              auran.
            </RouteLink>
          </Typography>

          <RouteLink
            className="text-link"
            to="/"
            style={{ textDecoration: "inherit" }}
          >
            <Button color="inherit" sx={{ marginRight: 1 }}>
              Book Flight
            </Button>
          </RouteLink>

          <RouteLink
            className="text-link"
            to="/admin"
            style={{ textDecoration: "inherit" }}
          >
            <Button color="inherit" sx={{ marginRight: 1 }}>
              Admin
            </Button>
          </RouteLink>

          <Button
            color="inherit"
            sx={{ backgroundColor: "#424864" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            sx={{ color: "#d8dee9" }}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderDrawer}
    </Box>
    // </ThemeProvider>
  );
}
