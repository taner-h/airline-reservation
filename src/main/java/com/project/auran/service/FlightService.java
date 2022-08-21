package com.project.auran.service;

import com.project.auran.model.Airplane;
import com.project.auran.model.Airport;
import com.project.auran.model.Ticket;
import com.project.auran.model.Flight;
import com.project.auran.repository.AirplaneRepository;
import com.project.auran.repository.AirportRepository;
import com.project.auran.repository.FlightRepository;
import com.project.auran.repository.TicketRepository;
import org.hibernate.Filter;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FlightService {
	private final FlightRepository flightRepository;
	@PersistenceContext
	EntityManager entityManager;
	@Autowired
	private AirplaneRepository airplaneRepository;
	@Autowired
	private AirportRepository airportRepository;
	@Autowired
	private TicketRepository ticketRepository;

	public FlightService(FlightRepository flightRepository) {
		this.flightRepository = flightRepository;
	}

	public Flight addFlight(Long airplaneId, Long destId, Long srcId, Flight flight) {
		Optional<Flight> flightName = flightRepository.findByCode(flight.getCode());
		if (flightName.isPresent())
			throw new RuntimeException("a flight by that name already exists.");
		Airplane airplane = airplaneRepository.findAirplaneById(airplaneId)
				.orElseThrow(() -> new IllegalStateException("no airplane found with given id"));
		flight.setAirplane(airplane);

		Airport destAirport = airportRepository.findAirportById(destId)
				.orElseThrow(() -> new IllegalStateException("no airport found with given id"));
		flight.setDestinationAirport(destAirport);

		Airport srcAirport = airportRepository.findAirportById(srcId)
				.orElseThrow(() -> new IllegalStateException("no airport found with given id"));
		flight.setSourceAirport(srcAirport);
		flightRepository.save(flight);
		return flight;

	}

	public Page<Flight> getAllFlights(Integer page, Integer pageSize, String sortBy) {
		return flightRepository.findAll(PageRequest.of(page, pageSize, Sort.Direction.ASC, sortBy));
	}

	public void deleteFlight(Long flightId) {
		Flight flight = flightRepository.findById(flightId)
				.orElseThrow(() -> new IllegalStateException("no flight found with given id"));
		if (ticketRepository.findTicketByFlight(flight) != null) {
			ticketRepository.deleteAllByFlight(flight);
		}
		flightRepository.deleteById(flightId);
	}

	public Flight updateFlight(Long flightId, Long airplaneId, Long destId, Long srcId, Flight newFlight) {
		Flight flight = flightRepository.findById(flightId)
				.orElseThrow(() -> new IllegalStateException("no flight found with given id"));
		Airplane airplane = airplaneRepository.findAirplaneById(airplaneId)
				.orElseThrow(() -> new IllegalStateException("no airplane found with given id"));
		flight.setAirplane(airplane);

		Airport destAirport = airportRepository.findAirportById(destId)
				.orElseThrow(() -> new IllegalStateException("no airport found with given id"));
		flight.setDestinationAirport(destAirport);

		Airport srcAirport = airportRepository.findAirportById(srcId)
				.orElseThrow(() -> new IllegalStateException("no airport found with given id"));
		flight.setSourceAirport(srcAirport);
		flight.setCode(newFlight.getCode());
		flight.setDuration(newFlight.getDuration());
		flight.setGate(newFlight.getGate());
		flight.setTakeoff(newFlight.getTakeoff());
		flight.setBusinessPrice(newFlight.getBusinessPrice());
		flight.setEconomyPrice(newFlight.getEconomyPrice());
		flightRepository.save(flight);
		return flight;
	}

	public Flight getFlight(Long flightId) {
		return flightRepository.findById(flightId)
				.orElseThrow(() -> new IllegalStateException("no flight found with given id"));
	}

	public List<Flight> searchFlights(Long srcId, Long destId, LocalDate dateStart,
			LocalDate dateEnd, Integer page, Integer pageSize) {

		//
		Session session = entityManager.unwrap(Session.class);
		Filter filter = session.enableFilter("flightSearch");
		filter.setParameter("dateStart", dateStart);
		filter.setParameter("dateEnd", dateEnd);
		// String hql = "from Flight f where f.destinationAirport.id = :destId and
		// f.sourceAirport.id = :srcId";
		Query query = session.createQuery(
				"from Flight f where f.destinationAirport.id = :destId and f.sourceAirport.id = :srcId order by f.id");
		query.setParameter("destId", destId);
		query.setParameter("srcId", srcId);
		if (page != null)
			query.setFirstResult((page - 1) * pageSize);
		if (pageSize != null)
			query.setMaxResults(pageSize);
		List<Flight> response = query.list();
		session.close();
		return response;

		// return entityManager.createQuery("select f from Flight f where
		// f.destinationAirport.id = :destId and f.sourceAirport.id = :srcId",
		// Flight.class).getResultList();

	}

}
