import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import ServiceGallery from "../ServiceGallery";
import { format } from "date-fns";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.service.title}</h1>
            <AddressLink className="flex my-2 block">{booking.service.address}</AddressLink>
            <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
                <h2 className="text-2xl">Your Booking Information</h2>
                <div className="py-3 pr-3 grow">
                    <div className="flex gap-2 items-center border-t border-gray-300 mt-2 py-2">
                        <div className="text-black-500">
                            Booking Date: {format(new Date(booking.bookingDate), 'yyyy-MM-dd')}
                        </div>
                        <div>
                            Total Price: Rs.{booking.price}
                        </div>
                    </div>
                    <div className="flex gap-2 items-center border-t border-gray-300 mt-2 py-2">

                        <div>
                            Service Contact Number: {booking.service.mobile}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-4xl">
                Thank you for Your booking! We hope that you enjoy our service.
            </div>
        </div>
    );
}