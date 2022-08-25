package com.project.auran.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String eticket;
    private String seat;
    private String flightClass;
    private String price;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="passenger_id")
    private Passenger passenger;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="flight_id")
    private Flight flight;

}
