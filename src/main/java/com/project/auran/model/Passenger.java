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
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String surname;
    private String PNR;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="gender_id")
    private Gender gender;
}
