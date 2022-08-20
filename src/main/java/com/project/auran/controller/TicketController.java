package com.project.auran.controller;

import com.project.auran.model.Flight;
import com.project.auran.model.Passenger;
import com.project.auran.model.Ticket;
import com.project.auran.service.FlightService;
import com.project.auran.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("ticket")
public class TicketController {
    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService){
        this.ticketService = ticketService;
    }

    @PostMapping
    public Ticket addTicket(@RequestParam Long passengerId,
                            @RequestParam Long flightId,
                            @RequestBody Ticket ticket){
        return ticketService.addTicket(passengerId, flightId, ticket);
    }

    @GetMapping
    public List<Ticket> getTickets(){
        return ticketService.getTickets();
    }

    @GetMapping(path = "{ticketId}")
    public Ticket getTicket(@PathVariable Long ticketId){
        return ticketService.getTicket(ticketId);
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{ticketId}")
    public void deleteTicket(@PathVariable Long ticketId){
        ticketService.deleteTicket(ticketId);
    }


}
