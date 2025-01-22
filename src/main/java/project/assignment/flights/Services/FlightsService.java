package project.assignment.flights.Services;

import project.assignment.flights.Models.FlightsDTO;

import java.util.List;

public interface FlightsService {

    List<FlightsDTO> getAllFlights();

    FlightsDTO getFlight(Long flightId);

    FlightsDTO createFlight(FlightsDTO flight);

    FlightsDTO updateFlight(Long flightId, FlightsDTO flight);

    void deleteFlight(Long flightId);
}
