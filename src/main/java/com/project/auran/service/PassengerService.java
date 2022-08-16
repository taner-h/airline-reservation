package com.project.auran.service;

import com.project.auran.model.Gender;
import com.project.auran.model.Passenger;
import com.project.auran.model.Ticket;
import com.project.auran.repository.FlightRepository;
import com.project.auran.repository.GenderRepository;
import com.project.auran.repository.PassengerRepository;
import com.project.auran.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PassengerService {

    private final PassengerRepository passengerRepository;

    public PassengerService(PassengerRepository passengerRepository){
        this.passengerRepository = passengerRepository;
    }
    @Autowired
    private GenderRepository genderRepository;
    @Autowired
    private TicketRepository ticketRepository;

    public Passenger addPassenger(Character genderId, Passenger passenger) {
        Optional<Passenger> passengerName = passengerRepository.findByPnr(passenger.getPnr());
        if (passengerName.isPresent()) throw new RuntimeException("a passenger by that PNR already exists.");
        Gender gender = genderRepository.findGenderById(genderId)
                .orElseThrow(() -> new IllegalStateException("no gender found with given id"));
        passenger.setGender(gender);
        passengerRepository.save(passenger);
        return passenger;
    }

    public List<Passenger> getPassengers() {
        return passengerRepository.findAll();
    }

    public Passenger getPassenger(Long passengerId) {
        return passengerRepository.findById(passengerId)
                .orElseThrow(() -> new IllegalStateException("no passenger found with given id"));

    }

    public void deletePassenger(Long passengerId) {
        passengerRepository.findById(passengerId)
                .orElseThrow(() -> new IllegalStateException("no passenger found with given id"));
        passengerRepository.deleteById(passengerId);
    }

    public List<Ticket> getPassengerTickets(Long passengerId) {
        Passenger passenger = passengerRepository.findById(passengerId)
                .orElseThrow(() -> new IllegalStateException("no passenger found with given id"));
        return ticketRepository.findTicketByPassenger(passenger);

    }
}
