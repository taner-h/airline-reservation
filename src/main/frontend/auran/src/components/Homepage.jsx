import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import DashboardNavBar from "./DashboardNavBar";
import NavBar from "./NavBar";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import moment from "moment";
import Button from "@mui/material/Button";


const mdTheme = createTheme();

export default function Homepage(props) {
    const [values, setValues] = useState({
        from: "",
        to: "",
        dateStart: null,
        dateEnd: null
    });



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
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <NavBar/>
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Recent Deposits */}
                            <Grid item xs={12}>
                                <Paper sx={{p: 6,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // backgroundColor: "#292d3e",
                                    // color: "#d8dee9"
                                }}>

                                    <Typography
                                        variant="h6"
                                        component="div"
                                        color="#292d3e"
                                        sx={{ marginLeft: 1, flexGrow: 1 }}
                                    >

                                        Book A Flight
                                    </Typography>
                                    <div>
                                    <FormControl sx={{ minWidth: 350, marginX: 2, marginY: 2 }}>

                                        <InputLabel id="from">From</InputLabel>
                                        <Select
                                            id="from"
                                            value={values.from}
                                            label="From"
                                            onChange={(e) => {setValues({...values, from: e.target.value});}}>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{  minWidth: 350, marginX: 2, marginY: 2 }}>
                                        <InputLabel id="to">To</InputLabel>
                                        <Select
                                            id="to"
                                            value={values.to}
                                            label="To"
                                            onChange={(e) => {setValues({...values, to: e.target.value});}}>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                    </div>

                                    <div>
                                        <FormControl sx={{  minWidth: 350, marginX: 2, marginY: 2 }}>

                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DesktopDatePicker
                                                label="Date Start"
                                                id="dateStart"
                                                // minDate={moment().format("DD/MM/yyyy")}
                                                inputFormat="DD/MM/yyyy"
                                                value={values.dateStart}
                                                onChange={
                                                (newValue) => {setValues({...values, dateStart: moment(newValue).format('YYYY-MM-DD')});
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        </FormControl>

                                            <FormControl sx={{  minWidth: 350, marginX: 2, marginY: 2 }}>

                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DesktopDatePicker
                                                label="Date End"
                                                id="dateEnd"
                                                inputFormat="DD/MM/yyyy"
                                                value={values.dateEnd}
                                                onChange={
                                                (newValue) => {setValues({...values, dateEnd: moment(newValue).format('YYYY-MM-DD')});
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                            </FormControl>

                                    </div>

                                    <div>
                                        <Button color='grey' variant="contained" sx={{ marginY: 1 ,color: "#d8dee9", backgroundColor: "#424864"}}>

                                            Search
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


