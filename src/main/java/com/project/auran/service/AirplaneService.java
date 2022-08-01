package com.project.auran.service;

import com.project.auran.model.Airline;
import com.project.auran.model.Airplane;
import com.project.auran.model.AirplaneModel;
import com.project.auran.repository.AirlineRepository;
import com.project.auran.repository.AirplaneModelRepository;
import com.project.auran.repository.AirplaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirplaneService {
    private final AirplaneRepository airplaneRepository;


    @Autowired
    public AirplaneService(AirplaneRepository airplaneRepository) {
        this.airplaneRepository = airplaneRepository;
    }

    @Autowired
    private AirplaneModelRepository airplaneModelRepository;
    @Autowired
    private AirlineRepository airlineRepository;


    public Airplane addAirplane(Airplane airplane, Long modelId, Long airlineId) {
        Optional<Airplane> airplaneName = airplaneRepository
                .findByRegistration(airplane.getRegistration());
        if (airplaneName.isPresent()) throw new RuntimeException("an airplane by that name already exists.");
        AirplaneModel model = airplaneModelRepository.findById(modelId)
                .orElseThrow(()-> new IllegalStateException("no airplane model found by given id."));
        Airline airline = airlineRepository.findById(modelId)
                .orElseThrow(()-> new IllegalStateException("no airline model found by given id."));
        airplane.setAirline(airline);
        airplane.setAirplaneModel(model);
        airplaneRepository.save(airplane);
        return airplane;

    }

    public List<Airplane> getAirplanes() {
        return airplaneRepository.findAll();
    }

    public void deleteAirplane(Long airplaneId) {
        airplaneRepository.findById(airplaneId)
                .orElseThrow(() -> new IllegalStateException("no airplane found with given id"));
        airplaneRepository.deleteById(airplaneId);
    }
}
