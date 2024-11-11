import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import doctorImg from "../../assets/images/doctor-img02.png";
import { authContext } from './../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MyAccount = () => {
    const [data, setData] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [location, setLocation] = useState(null); // Use null to detect loading state
    const [error, setError] = useState(null);
    const { user, dispatch } = useContext(authContext);

    // Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyCieJL1o6fnvh1AJgOjg-dqS8eZybvyj-E', // Replace with your API key
    });

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    const id = user._id;
    const api = `http://localhost:8000/api/customers/${id}`;

    // Fetch user data and appointments
    useEffect(() => {
        (async function () {
            const result = await fetch(api).then(res => res.json());
            setData(result);
            setAppointments(result.appointments || []);
        })();
    }, [api]);

    // Get current location
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Latitude:", latitude, "Longitude:", longitude); // Log coordinates
                    setLocation({ lat: latitude, lng: longitude });
                },
                (err) => setError("Error getting location: " + err.message),
                { enableHighAccuracy: true }
            );

            // Cleanup the watcher on component unmount
            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    // Debugging: Log when location and isLoaded are ready
    useEffect(() => {
        if (location) {
            console.log("Location set:", location);
        }
    }, [location]);

    return (
        <div className='max-w-[1170px] px-5 mx-auto'>
            {/* Profile Section */}
            <div className='grid md:grid-cols-3 gap-10'>
                <div className='pd-[50px] px-[30px] rounded-md'>
                    <div className='flex items-center justify-center'>
                        <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                            <img src={doctorImg} alt='' className='w-full h-full rounded-full' />
                        </figure>
                    </div>
                    <div className='text-center mt-4'>
                        <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{user.name}</h3>
                        <p className='text-textColor text-[15px] leading-6 font-medium'>{data.email}</p>
                    </div>
                    <div className='mt-[50px] md:mt-[100px] space-y-2'>
                        <Link to='/login'>
                            <button onClick={handleLogout} className='w-full bg-[#181a1e] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
                        </Link>
                        <button className='w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white'>Delete Account</button>
                    </div>
                </div>

                {/* Appointments Section */}
                <div className='md:col-span-2 md:px-[30px]'>
                    <div>
                        <button className='p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor'>
                            My Bookings
                        </button>
                    </div>

                    <div className='mt-4'>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <div key={appointment._id} className='p-4 border border-gray-300 rounded-md mb-4'>
                                    <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                                    <p><strong>Time:</strong> {appointment.time}</p>
                                    <p><strong>Reason:</strong> {appointment.reason}</p>
                                    <p><strong>Status:</strong> {appointment.status}</p>
                                </div>
                            ))
                        ) : (
                            <p>No appointments found.</p>
                        )}
                    </div>

                    {/* Map Section */}
                    <div className='mt-8'>
                        {isLoaded ? (
                            location ? (
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={location}
                                    zoom={15} // Adjust zoom level if needed
                                >
                                    {/* User Marker */}
                                    <Marker position={location} />

                                    {/* Accuracy Circle */}
                                    <Circle
                                        center={location}
                                        radius={50}
                                        options={{
                                            fillColor: '#ff0000',
                                            fillOpacity: 0.2,
                                            strokeColor: '#FF0000',
                                            strokeOpacity: 0.3,
                                        }}
                                    />
                                </GoogleMap>
                            ) : (
                                <p>Getting your location...</p>
                            )
                        ) : (
                            <p>Loading map...</p>
                        )}
                        {error && <p className='text-red-500'>{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;