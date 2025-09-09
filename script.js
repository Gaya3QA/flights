const apiUserUrl = 'http://localhost:8080/users'; // Replace with your API base URL
const apiFlightUrl = 'http://localhost:8081/flights';
const apiBookingUrl = 'http://localhost:8082/booking';

// Register User
function registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('return').value;
  
    if (!username) {
        alert("Please enter a username.");
        return;
    }

    const user = { 
        username: username,
        email: email,
        phone: phone,
        departure: departure,
        arrival: arrival

    };

    fetch(`${apiUserUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
       
    })
    .then(response => response.json())
    .then(data => {
        alert(`User created successfully! User ID: ${data.id}`);
    })
    .catch(error => {
        alert("Error creating user: " + error.message);
    });
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = ' ';
    document.getElementById('departure').value = '';
    document.getElementById('arrival').value = '';

}

// Get All Flights
function getAllFlights() {
    fetch(`${apiFlightUrl}`)
    .then(response => response.json())
    .then(data => {
        const flightList = document.getElementById('flight-list');
        const flightIdSelect = document.getElementById('flight-id');

        // Clear previous options
        flightList.innerHTML = '';
        flightIdSelect.innerHTML = '';

        data.forEach(flight => {
            const option = document.createElement('option');
            option.value = flight.id;
            option.textContent = `${flight.id} | ${flight.flightNumber} | ${flight.departure} -> ${flight.arrival} | ${flight.price} USD | Seats: ${flight.availableSeats}`;
            flightList.appendChild(option);

            const optionForBooking = document.createElement('option');
            optionForBooking.value = flight.id;
            optionForBooking.textContent = `${flight.id}`;
            flightIdSelect.appendChild(optionForBooking);
        });
    })
    .catch(error => {
        alert("Error fetching flights: " + error.message);
    });
}

// Create Booking
// Create Booking using GET request with query parameters
function createBooking() {
    const userId = document.getElementById('user-id').value;
    const flightId = document.getElementById('flight-id').value;
    const seats = document.getElementById('seats').value;
    
    let status = {
         status :"Booked"
    }

    // Validate if all fields are filled
    if (!userId || !flightId || !seats) {
        alert("Please provide all details to make a booking.");
        return;
    }

    // Ensure that input fields are numbers
    if (isNaN(userId) || isNaN(flightId) || isNaN(seats)) {
        alert("Please enter valid numbers for user ID, flight ID, and seats.");
        return;
    }

    // Create the URL with query parameters
    const url = `http://localhost:8082/booking?userId=${userId}&flightId=${flightId}&seats=${seats}`;

    // Make the GET request to create a booking
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(status)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(`Booking successful! Booking ID: ${data.id}`);
    })
    .catch(error => {
        alert("Error creating booking: " + error.message);
    });
}


// Get User Bookings
function getUserBookings() {
    const userId = document.getElementById('user-id').value;

    if (!userId) {
        alert("Please provide a user ID to view bookings.");
        return;
    }

    fetch(`${apiBookingUrl}/user/${userId}`)
    .then(response => response.json())
    .then(data => {
        const bookingsDiv = document.getElementById('user-bookings');

        if (data.length === 0) {
            bookingsDiv.innerHTML = "No bookings found.";
        } else {
            let bookingList = "<ul>";
            data.forEach(booking => {
                bookingList += `<li>Booking ID: ${booking.id}, Flight: ${booking.flight.departure} -> ${booking.flight.arrival}, Seats: ${booking.seats}</li>`;
            });
            bookingList += "</ul>";
            bookingsDiv.innerHTML = bookingList;
        }
    })
    .catch(error => {
        alert("Error fetching bookings: " + error.message);
    });
}
