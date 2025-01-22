package project.assignment.flights.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import project.assignment.flights.Models.FlightsDTO;

import java.util.List;
@Service
public class FlightsServiceImpl implements FlightsService {
    @Autowired
    RestTemplate restTemplate;
    @Value("${db.ms.url}")
    String db_url;
    @Override
    public List<FlightsDTO> getAllFlights() {
        String url = db_url + "/flights";
        FlightsDTO[] flights = restTemplate.getForObject(url, FlightsDTO[].class);
        return List.of(flights);
    }

    @Override
    public FlightsDTO getFlight(Long flightId) {
        String url = db_url + "/flights/" + flightId;
        return restTemplate.getForObject(url, FlightsDTO.class);
    }

    @Override
    public FlightsDTO createFlight(FlightsDTO flight) {
        return restTemplate.postForObject(db_url + "/flights", flight, FlightsDTO.class);
    }

    @Override
    public FlightsDTO updateFlight(Long flightId, FlightsDTO flight) {
        restTemplate.put(db_url + "/flights/" + flightId, flight);
        return getFlight(flightId);
    }

    @Override
    public void deleteFlight(Long flightId) {
        restTemplate.delete(db_url + "/flights/" + flightId);
    }
}
