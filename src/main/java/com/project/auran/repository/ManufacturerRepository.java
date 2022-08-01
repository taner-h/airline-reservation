package com.project.auran.repository;

import com.project.auran.model.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface  ManufacturerRepository extends JpaRepository<Manufacturer, Long> {

    Optional<Manufacturer> findByName(String name);

    Optional<Manufacturer> findManufacturerById(Long manufacturerId);
}
