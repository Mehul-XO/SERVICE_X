// import React, { useState } from 'react';
// import CloseIcon from '@mui/icons-material/Close';
// import { Button } from '@mui/material';
// import dayjs from 'dayjs';

// export const Schedule = ({ selectDate, setDisplay }) => {
//     const [close, setClose] = useState(true);
//     const [formData, setFormData] = useState({
//         email: "",
//         subject: "Appointment Confirmed",
//         message: `Your Appointment is Scheduled on ${selectDate.format("YYYY-MM-DD")}`, // Use dayjs to format the date
//     });
    
//     const [displayData, setDisplayData] = useState({
//         dayDate: selectDate.format("YYYY-MM-DD"), // Format the selected date
//         service: "",
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleInputChange2 = (e) => {
//         const { name, value } = e.target;
//         setDisplayData({ ...displayData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response1 = await fetch("http://localhost:8000/api/mail", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             });
//             const result1 = await response1.json();
//             console.log("Success", result1);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <>
//             {close && (
//                 <section className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm'>
//                     <div>
//                         <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[360px] mx-auto p-4 bg-white rounded shadow-lg">
//                             <button
//                                 type="button"
//                                 onClick={() => {
//                                     setClose(false);
//                                     setDisplay(false);
//                                 }}
//                                 className="self-end text-gray-600 hover:text-gray-800"
//                             >
//                                 <CloseIcon />
//                             </button>
//                             <span className="text-lg font-semibold mb-2">{selectDate.format("YYYY-MM-DD")}</span> {/* Format the date */}
//                             <input
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 placeholder="Email"
//                                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <input
//                                 name="service"
//                                 value={displayData.service}
//                                 onChange={handleInputChange2}
//                                 placeholder="service"
//                                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <Button
//                                 type="submit"
//                                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-500"
//                             >
//                                 CONFIRM
//                             </Button>
//                         </form>
//                     </div>
//                 </section>
//             )}
//         </>
//     );
// };


import React, { useState, useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { authContext } from "../context/AuthContext.jsx";

export const Schedule = ({ selectDate, setDisplay }) => {
    const { user } = useContext(authContext);  // Get patient details from AuthContext
    const customerId = user._id;  // Extract patient ID from user object
    const { id: captainId } = useParams();  // Get doctor ID from URL parameters
    console.log(customerId, captainId);

    const [close, setClose] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        subject: "Appointment Confirmed",
        message: `Your Appointment is Scheduled on ${selectDate.format("YYYY-MM-DD")}`, // Use dayjs to format the date
    });

    const [displayData, setDisplayData] = useState({
        dayDate: selectDate.format("YYYY-MM-DD"), // Format the selected date
        service: "",
    });

    // Combined input handler for form data and display data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChange2 = (e) => {
        const { name, value } = e.target;
        setDisplayData({ ...displayData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Update formData message with the latest service
        const updatedFormData = {
            ...formData,
            message: `Your Appointment is scheduled on ${selectDate.format("YYYY-MM-DD")} for the services of ${displayData.service}.`,
        };
    
        const appointmentData = {
            captainId,
            customerId,
            date: selectDate.format("YYYY-MM-DD"), // Use dayjs to format the date
            time: selectDate.format("HH:mm"), // Extract time from selected date
            reason: displayData.service,  // Reason for appointment (service)
        };
    
        try {
            const response2 = await fetch("http://localhost:8000/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify(appointmentData),
            });
    
            const result2 = await response2.json();
            if (!response2.ok) {
                throw new Error(result2.message || "Failed to create appointment");
            }
            console.log("Appointment Success", result2);
    
            setClose(false);
            setDisplay(false);
    
            // Send email confirmation with updated message
            const response1 = await fetch("http://localhost:8000/api/mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFormData),
            });
    
            const result1 = await response1.json();
            console.log("Email Success", result1);
        } catch (error) {
            console.error("Error creating appointment:", error.message);
        }
    };

    return (
        <>
            {close && (
                <section className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm'>
                    <div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[360px] mx-auto p-4 bg-white rounded shadow-lg">
                            <button
                                type="button"
                                onClick={() => {
                                    setClose(false);
                                    setDisplay(false);
                                }}
                                className="self-end text-gray-600 hover:text-gray-800"
                            >
                                <CloseIcon />
                            </button>
                            <span className="text-lg font-semibold mb-2">{selectDate.format("YYYY-MM-DD")}</span> {/* Display formatted date */}
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                name="service"
                                value={displayData.service}
                                onChange={handleInputChange2}
                                placeholder="Service"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                            >
                                CONFIRM
                            </Button>
                        </form>
                    </div>
                </section>
            )}
        </>
    );
};