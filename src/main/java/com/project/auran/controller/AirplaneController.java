package com.project.auran.controller;

import com.project.auran.model.Airplane;
import com.project.auran.service.AirplaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "airplane")
public class AirplaneController {

    private final AirplaneService airplaneService;

    @Autowired
    public  AirplaneController(AirplaneService airplaneService){
        this.airplaneService = airplaneService;
    }

    @GetMapping
    public List<Airplane> getAirplanes(){
        return airplaneService.getAirplanes();
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



}
