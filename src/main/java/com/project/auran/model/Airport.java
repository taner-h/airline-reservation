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
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="city_id")
    private City city;

    @NotNull
    private String code;

}
