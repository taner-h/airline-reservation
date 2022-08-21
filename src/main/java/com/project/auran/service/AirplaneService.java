package com.project.auran.service;

import com.project.auran.model.Airline;
import com.project.auran.model.Airplane;
import com.project.auran.model.AirplaneModel;
import com.project.auran.repository.AirlineRepository;
import com.project.auran.repository.AirplaneModelRepository;
import com.project.auran.repository.AirplaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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

    public Page<Airplane> getAirplanes(Integer page, Integer pageSize, String sortBy) {
        return airplaneRepository.findAll(PageRequest.of(page, pageSize, Sort.Direction.ASC, sortBy));
    }

    public void deleteAirplane(Long airplaneId) {
        airplaneRepository.findById(airplaneId)
                .orElseThrow(() -> new IllegalStateException("no airplane found with given id"));
        airplaneRepository.deleteById(airplaneId);
    }

    public Airplane getAirplane(Long airplaneId) {
        return airplaneRepository.findById(airplaneId)
                .orElseThrow(() -> new IllegalStateException("no airplane found with given id"));
    }

    public Airplane updateAirplane(Long airplaneId, 
                                   String registration, 
                                   Long airplaneModelId, 
                                   Long airlineId) {
        Airplane airplane = airplaneRepository.findById(airplaneId)
                .orElseThrow(() -> new IllegalStateException("no airplane found with given id"));
        
        if (registration != null) airplane.setRegistration(registration);
        if (airplaneModelId != null) {
            AirplaneModel airplaneModel = airplaneModelRepository.findById(airplaneModelId)
                    .orElseThrow(() -> new IllegalStateException("no airplane model found with given id"));
            airplane.setAirplaneModel(airplaneModel);
        }
        if (airlineId != null) {
            Airline airline = airlineRepository.findById(airlineId)
                    .orElseThrow(() -> new IllegalStateException("no airplane found with given id"));
            airplane.setAirline(airline);
        }
        airplaneRepository.save(airplane);
        return airplane;
    }
}
