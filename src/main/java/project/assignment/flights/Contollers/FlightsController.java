package project.assignment.flights.Contollers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import project.assignment.flights.Models.FlightsDTO;
import project.assignment.flights.Services.FlightsService;

import java.util.List;
@RestController
@RequestMapping("/flights")
public class FlightsController {

    private final FlightsService flightsService;

    public FlightsController(FlightsService flightsService) {
        this.flightsService = flightsService;
    }

    @GetMapping
    public List<FlightsDTO> getAllFlights() {
        return flightsService.getAllFlights();
    }

    @GetMapping("/{flightId}")
    public FlightsDTO getFlight(@PathVariable Long flightId) {
        return flightsService.getFlight(flightId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FlightsDTO createFlight(@RequestBody FlightsDTO flight) {
        return flightsService.createFlight(flight);
    }

    @PutMapping("/{flightId}")
    public void updateFlight(@PathVariable Long flightId, @RequestBody FlightsDTO flight) {
        flightsService.updateFlight(flightId, flight);
    }

    @DeleteMapping("/{flightId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFlight(@PathVariable Long flightId) {
        flightsService.deleteFlight(flightId);
    }
}
