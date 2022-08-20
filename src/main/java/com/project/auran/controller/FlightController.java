package com.project.auran.controller;

import com.project.auran.model.Flight;
import com.project.auran.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("flight")
public class FlightController {

    private final FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @PostMapping
    public Flight addFlight(@RequestParam Long airplaneId,
                            @RequestParam Long destId,
                            @RequestParam Long srcId,
                            @RequestBody Flight flight) {
        return flightService.addFlight(airplaneId, destId, srcId, flight);
    }

    @GetMapping
    public Page<Flight> getAllFlights(@RequestParam(defaultValue = "0") Integer page,
                                      @RequestParam(defaultValue = "10") Integer pageSize,
                                      @RequestParam(defaultValue = "id") String sortBy) {

        return flightService.getAllFlights(page, pageSize, sortBy);
    }
    
    @Transactional
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{flightId}")
    public void deleteFlight(@PathVariable Long flightId) {
        flightService.deleteFlight(flightId);
    }


    @GetMapping(path = "{flightId}")
    public Flight getFlight(@PathVariable Long flightId) {
        return flightService.getFlight(flightId);
    }

    @GetMapping(path = "/search")
    public List<Flight> searchFlights(@RequestParam(required = false) Integer page,
                                      @RequestParam(required = false) Integer pageSize,
                                      @RequestParam Long srcId,
                                      @RequestParam Long destId,
                                      @RequestParam("dateStart")
                                      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateStart,
                                      @RequestParam("dateEnd")
                                      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateEnd) {
        return flightService.searchFlights(srcId, destId, dateStart, dateEnd, page, pageSize);
    }


}
