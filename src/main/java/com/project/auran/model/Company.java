package com.project.auran.model;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor

public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @NotNull
    private String website;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="country_id")
    private Country country;


}
