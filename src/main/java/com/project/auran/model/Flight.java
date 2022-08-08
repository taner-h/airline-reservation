package com.project.auran.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="airplane_id")
    private Airplane airplane;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="dest_airport_id")
    private Airport destinationAirport;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="src_airport_id")
    private Airport sourceAirport;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime takeoff;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime eta;

    private String code;

    private String gate;


}
