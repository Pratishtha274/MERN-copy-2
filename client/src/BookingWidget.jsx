import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

export default function BookingWidget({ service }) {
    const [bookingDate, setBookingDate] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [addr, setAddr] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    async function bookThisService() {
        try {
            if (!user) {
                throw new Error('User is not registered.');
            }

            // Check if any field is empty
            if (!bookingDate || !name || !mobile || !addr) {
                throw new Error('Incomplete booking information. Please fill all fields.');
            }

            const response = await axios.post('/bookings', {
                bookingDate,
                name,
                mobile,
                addr,
                service: service._id,
                price: service.price
            });

            const bookingId = response.data._id;
            setRedirect(`/account/bookings/${bookingId}`);
        } catch (error) {
            console.error("Error booking service:", error.message);
            alert(error.message); // Display alert for error message
            setRedirect('/'); // Stay on the same page
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price Per Day: Rs.{service.price}
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Booking Date:</label>
                        <input
                            className="border rounded-xl px-1"
                            type="date"
                            value={bookingDate}
                            onChange={ev => setBookingDate(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="py-3 px-4">
                    <label>Your Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                </div>
                <div className="py-3 px-4">
                    <label>Mobile:</label>
                    <input
                        type="tel"
                        value={mobile}
                        onChange={ev => setMobile(ev.target.value)}
                    />
                </div>
                <div className="py-3 px-4">
                    <label>Address:</label>
                    <input
                        type="text"
                        value={addr}
                        onChange={ev => setAddr(ev.target.value)}
                    />
                </div>
            </div>
            <button onClick={bookThisService} className="primary mt-4 shadow shadow-gray-500">Book this Service</button>
        </div>
    );
}
