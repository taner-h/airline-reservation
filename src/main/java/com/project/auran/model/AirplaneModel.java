package com.project.auran.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "airplane_model")
@AllArgsConstructor
@NoArgsConstructor
public class AirplaneModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String series;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="airplane_family_id")
    private AirplaneFamily airplaneFamily;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="airplane_type_id")
    private AirplaneType airplaneType;

    private float wingSpan;
    private float height;
    private float length;
    private Integer businessSeatRow;
    private Integer businessSeatColumn;
    private Integer economySeatRow;
    private Integer economySeatColumn;










}
