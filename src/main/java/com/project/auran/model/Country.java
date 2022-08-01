package com.project.auran.model;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Table(name = "country")
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @NotNull
    private String code;


}
