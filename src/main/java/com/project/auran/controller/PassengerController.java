package com.project.auran.controller;

import com.project.auran.model.Passenger;
import com.project.auran.service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("passenger")
public class PassengerController {
    private final PassengerService passengerService;
    
    @Autowired
    public PassengerController(PassengerService passengerService){
        this.passengerService = passengerService;
    }

    @PostMapping
    public Passenger addPassenger(@RequestParam Character genderId,
                                  @RequestBody Passenger passenger){
        return passengerService.addPassenger(genderId, passenger);
    }

    @GetMapping
    public List<Passenger> getPassengers(){
        return passengerService.getPassengers();
    }

    @GetMapping(path = "{passengerId}")
    public Passenger getPassenger(@PathVariable Long passengerId){
        return passengerService.getPassenger(passengerId);
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{passengerId}")
    public void deletePassenger(@PathVariable Long passengerId){
        passengerService.deletePassenger(passengerId);
    }
}
