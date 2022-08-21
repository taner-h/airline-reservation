package com.project.auran.controller;

import com.project.auran.model.Airplane;
import com.project.auran.model.Airport;
import com.project.auran.model.Flight;
import com.project.auran.service.AirplaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "airplane")
public class AirplaneController {

    private final AirplaneService airplaneService;

    @Autowired
    public AirplaneController(AirplaneService airplaneService){
        this.airplaneService = airplaneService;
    }

    @GetMapping
    public Page<Airplane> getAirplanes(@RequestParam(defaultValue = "0") Integer page,
                                      @RequestParam(defaultValue = "10") Integer pageSize,
                                      @RequestParam(defaultValue = "id") String sortBy) {
        return airplaneService.getAirplanes(page, pageSize, sortBy);
    }

    @GetMapping(path = "{airplaneId}")
    public Airplane getAirplane(@PathVariable Long airplaneId){
        return airplaneService.getAirplane(airplaneId);
    }

    @PostMapping
    private Airplane addAirplane(@RequestBody Airplane airplane,
                                 @RequestParam (required = true) Long modelId,
                                 @RequestParam (required = true) Long airlineId){
        return airplaneService.addAirplane(airplane, modelId, airlineId);
    }
    
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{airplaneId}")
    public void deleteAirplane(@PathVariable Long airplaneId){
        airplaneService.deleteAirplane(airplaneId);
    }

    @PutMapping(path = "{airplaneId}")
    public Airplane updateAirplane(@PathVariable Long airplaneId,
                                 @RequestParam (required = false) String registration,
                                 @RequestParam (required = false) Long airplaneModelId,
                                 @RequestParam (required = false) Long airlineId){
        return airplaneService.updateAirplane(airplaneId, registration, airplaneModelId, airlineId);
    }
    


}
