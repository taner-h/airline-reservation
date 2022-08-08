package com.project.auran.repository;

import com.project.auran.model.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GenderRepository extends JpaRepository<Gender, Character> {

    Optional<Gender> findGenderById(Character genderId);
}
