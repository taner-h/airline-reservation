package com.project.auran.controller;

import com.project.auran.model.Passenger;
import com.project.auran.model.Ticket;
import com.project.auran.service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
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
    public Page<Passenger> getPassengers(@RequestParam(defaultValue = "0") Integer page,
                                         @RequestParam(defaultValue = "10") Integer pageSize,
                                         @RequestParam(defaultValue = "id") String sortBy){
        return passengerService.getPassengers(page, pageSize, sortBy);
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

    @GetMapping(path = "{passengerId}/tickets")
    public List<Ticket> getPassengerTickets(@PathVariable Long passengerId){
        return passengerService.getPassengerTickets(passengerId);
    }

}
