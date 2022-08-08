package com.project.auran.controller;

import com.project.auran.model.Passenger;
import com.project.auran.service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("passenger")
public class PassengerController {
    private final PassengerService passengerService;
    
    @Autowired
    public PassengerController(PassengerService passengerService){
        this.passengerService = passengerService;
    }

    @PostMapping(path = "{genderId}")
    public Passenger addPassenger(@RequestParam Character genderId,
                                  @RequestBody Passenger passenger){
        return passengerService.addPassenger(genderId, passenger);
    }

}
