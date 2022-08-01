package com.project.auran.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="country_id")
    private Country country;


}
