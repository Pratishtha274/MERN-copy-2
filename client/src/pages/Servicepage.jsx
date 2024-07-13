import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import ServiceImg from "../ServiceImg";
export default  function Servicepage() {
    const [services,setServices] = useState([]);
    useEffect(() => {
      axios.get('/user-services').then(({data}) =>{
        setServices(data);
      });
    },[]);
    return(
        <div>
            <AccountNav/>
                 <div className="text-center">
                 <Link className="inline-flex  gap-1 bg-primary text-white py-2 px-6 rounded-full mt-8"  to={'/account/services/new'}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
 </svg>
                      Add new Services
                      </Link>
             </div>
             <div className="mt-4">
                {services.length > 0 && services.map(service =>(
                    <Link to={'/account/services/'+service._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-4 ">
                        <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                            <ServiceImg service={service}/>
                        </div>
                        <div className="grow-0 shrink">
                        <h2 className="text-xl">{service.title}</h2>
                        <p className="text-sm mt-2">{service.description}</p>
                        </div>
                    </Link>
                ))}
             </div>
        
            
        </div>
    );
}