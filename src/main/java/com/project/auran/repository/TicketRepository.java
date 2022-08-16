package com.project.auran.repository;

import com.project.auran.model.Passenger;
import com.project.auran.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Optional<Ticket> findByEticket(String eticket);

    List<Ticket> findTicketByPassenger(Passenger passenger);
}
