import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "./Image";

// Slider data
const sliderData = [
    {
        image: "https://images.unsplash.com/photo-1535090467336-9501f96eef89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwxM3x8Z2FyZGVuZXJ8ZW58MHx8fHwxNzE5NjYzOTcxfDA&ixlib=rb-4.0.3&q=80&w=1080",
        text: "I Clean the ground, When I look around"
    },
    {
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHw1fHxwbHVtYmluZ3xlbnwwfHx8fDE3MTk2MzEyMDJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
        text: "I hope, It’s not choked"
    },
    {
        image: "https://images.unsplash.com/photo-1559308078-88465deb35cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwxMHx8aW5kaWFuJTIwbWFpZHxlbnwwfHx8fDE3MTk2NjM3Nzh8MA&ixlib=rb-4.0.3&q=80&w=1080",
        text: "May I help you Madam?"
    }
];

// Categories data
const categories = [
    { name: "Cleaning" },
    { name: "Plumbing" },
    { name: "Gardening" },
    { name: "AC Repair" },
    { name: "TV Repair" }
];

export default function IndexPage() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('/services').then(response => {
            setServices([...response.data]);
        });
    }, []);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    // Function to scroll to services section
    const scrollToServices = () => {
        document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="mt-8 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side - Slider Module */}
                    <div className="w-full md:w-2/3 lg:w-3/4 rounded-lg overflow-hidden mb-8 md:mb-0 md:mr-8">
                        <Slider {...settings}>
                            {sliderData.map((slide, index) => (
                                <div key={index} className="flex flex-col items-center p-4">
                                    <img src={slide.image} alt={slide.text} className="w-full h-96 object-cover rounded-lg" />
                                    <p className="mt-2 text-center text-gray-700 font-semibold bg-white p-2 rounded-lg shadow-md border border-gray-200">{slide.text}</p>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* Right Side - Categories Section */}
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <div className="bg-white p-4 shadow-lg rounded-lg">
                            <h2 className="text-xl font-bold mb-4">How May I Help You?</h2>
                            <ul className="space-y-2">
                                {categories.map((category, index) => (
                                    <li 
                                        key={index} 
                                        className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                                        onClick={scrollToServices}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Services Section */}
                <div id="services-section" className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                    {services.length > 0 && services.map(service => (
                        <Link to={'/service/' + service._id} key={service._id} className="group">
                            <div className="bg-white shadow-lg overflow-hidden mb-4 transition-transform transform hover:scale-105 rounded-lg">
                                {service.photos?.[0] && (
                                    <Image 
                                        className="w-full h-48 object-cover" 
                                        src={service.photos[0]} 
                                        alt={service.title} 
                                    />
                                )}
                                <div className="p-4">
                                    <h2 className="mt-1 text-gray-900 text-lg font-bold truncate">{service.title}</h2>
                                    <h3 className="text-gray-700 font-semibold truncate">{service.address}</h3>
                                    <div className="mt-2 text-gray-700">
                                        <span className="font-bold">Rs. {service.price}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
