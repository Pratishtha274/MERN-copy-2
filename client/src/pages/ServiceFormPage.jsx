import AccountNav from "../AccountNav";
import PhotosUploader from "../PhotosUploader";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";


export default function ServiceFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [price, setPrice] = useState(100);
    const [mobile, setMobile] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/services/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setArrivalTime(data.arrivalTime);
            setDepartureTime(data.departureTime);
            setPrice(data.price);
            setMobile(data.mobile)
        });
    }, [id]);

    async function saveService(ev) {
        ev.preventDefault();
        const serviceData = {
            title, address, addedPhotos,
            description, departureTime, arrivalTime, price,
            mobile
        };
        try {
            if (id) {
                await axios.put('/services', { id, ...serviceData });
            } else {
                await axios.post('/services', serviceData);
            }
            setRedirect(true);
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Failed to save service. Please try again.');
        }
    }

    if (redirect) {
        return <Navigate to={'/account/services'} />;
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={saveService} className="space-y-4">
                <h2 className="text-xl mt-2">Service Required</h2>
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title, for example: Cleaning" className="input-field" />

                <h2 className="text-xl">Address</h2>
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" className="input-field" />

                <h2 className="text-xl">Photos</h2>
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                <h2 className="text-xl">Description</h2>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} className="textarea-field" />

                <h2 className="text-xl">Time Slots Available</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <h3>Start Time</h3>
                        <input type="text" value={arrivalTime} onChange={ev => setArrivalTime(ev.target.value)} placeholder="13:00" className="input-field" />
                    </div>
                    <div>
                        <h3>End Time</h3>
                        <input type="text" value={departureTime} onChange={ev => setDepartureTime(ev.target.value)} placeholder="15:00" className="input-field" />
                    </div>
                    <div>
                        <h3>Price Per Day</h3>
                        <input type="text" value={price} onChange={ev => setPrice(ev.target.value)} placeholder="200" className="input-field" />
                    </div>
                    <div>
                        <h3>Mobile Number</h3>
                        <input type="text" value={mobile} onChange={ev => setMobile(ev.target.value)} placeholder="" className="input-field" />
                    </div>
                </div>

                <button className="primary my-4">Save</button>
            </form>
        </div>
    );
}
