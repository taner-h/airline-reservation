package com.project.auran.service;

import com.project.auran.model.Airplane;
import com.project.auran.model.Flight;
import com.project.auran.model.Gender;
import com.project.auran.model.Passenger;
import com.project.auran.repository.AirplaneRepository;
import com.project.auran.repository.FlightRepository;
import com.project.auran.repository.GenderRepository;
import com.project.auran.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PassengerService {

    private final PassengerRepository passengerRepository;

    public PassengerService(PassengerRepository passengerRepository){
        this.passengerRepository = passengerRepository;
    }
    @Autowired
    private GenderRepository genderRepository;

    public Passenger addPassenger(Character genderId, Passenger passenger) {
        Optional<Passenger> passengerName = passengerRepository.findByPNR(passenger.getPNR());
        if (passengerName.isPresent()) throw new RuntimeException("a passenger by that name already exists.");
        Gender gender = genderRepository.findGenderById(genderId)
                .orElseThrow(() -> new IllegalStateException("no gender found with given id"));
        passenger.setGender(gender);
        passengerRepository.save(passenger);
        return passenger;
    }
}
