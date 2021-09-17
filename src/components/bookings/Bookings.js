import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data));
    }, [loggedInUser.email])
    return (
        <div>
            <h1>Total Bookings {bookings.length}</h1>
            {
                bookings.map(booking => <li>{booking.name} from: {(new Date(booking.checkIn)).toDateString('dd/MM/yyyy')} To: {(new Date(booking.checkOut)).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default Bookings;