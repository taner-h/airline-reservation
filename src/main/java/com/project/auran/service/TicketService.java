package com.project.auran.service;

import com.project.auran.model.*;
import com.project.auran.repository.PassengerRepository;
import com.project.auran.repository.FlightRepository;
import com.project.auran.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository){
        this.ticketRepository = ticketRepository;
    }

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    public Ticket addTicket(Long passengerId, Long flightId, Ticket ticket) {
        Optional<Ticket> ticketName = ticketRepository.findByEticket(ticket.getEticket());
        if (ticketName.isPresent()) throw new RuntimeException("a ticket by that name already exists.");
        
        Passenger passenger = passengerRepository.findPassengerById(passengerId)
                .orElseThrow(() -> new IllegalStateException("no passenger found with given id"));
        ticket.setPassenger(passenger);

        Flight flight = flightRepository.findFlightById(flightId)
                .orElseThrow(() -> new IllegalStateException("no flight found with given id"));
        ticket.setFlight(flight);

        ticketRepository.save(ticket);
        return ticket;
    }

    public List<Ticket> getTickets() {
        return ticketRepository.findAll();
    }


    public Ticket getTicket(Long ticketId) {
        return ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalStateException("no ticket found with given id"));
    }

    public void deleteTicket(Long ticketId) {
        ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalStateException("no ticket found with given id"));
        ticketRepository.deleteById(ticketId);
    }
}
