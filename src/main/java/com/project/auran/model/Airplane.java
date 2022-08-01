package com.project.auran.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Airplane {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String registration;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="airplane_model_id")
    private AirplaneModel airplaneModel;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="airline_id")
    private Airline airline;

}
