import { useEffect,useState } from "react";
import { useParams} from "react-router-dom";

import axios from "axios";
import BookingWidget from "../BookingWidget";
import ServiceGallery from "../ServiceGallery";
import AddressLink from "../AddressLink";
export default function ServicePages(){
    const {id} = useParams();
    const [service,setService]=useState(null);
    useEffect(() => {
        if(!id){
           return; 
        }
        axios.get(`/services/${id}`).then(response =>{
             setService(response.data);
        });
    },[id])

    if(!service) return '';


    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{service.title}</h1>
                <AddressLink>
                    {service.address}
                </AddressLink>
                <ServiceGallery service={service}/>
                <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {service.description}</div>
                <div className="mt-8 mb-4 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                  <div>
                    Start Time: {service.arrivalTime}<br/>
                    End Time: {service.departureTime}
                  </div>
                  <div>
                    <BookingWidget service={service} />
                  </div>
                </div>
        </div>
    );
}