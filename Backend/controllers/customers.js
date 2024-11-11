import User from "../models/UserSchema.js"; // Assuming this is now "User"

// Get all patients
export const getAllPatients = async (request, response) => {
    try {
        const patients = await User.find().select("-password"); // Exclude passwords
        if (!patients.length) return response.sendStatus(404);
        return response.status(200).send(patients);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error fetching patients" });
    }
};

// Get patient by ID
// export const getPatientsById = async (request, response) => {
//     const { id } = request.params;
//     try {
//         const patient = await User.findById(id).select("-password"); // Exclude password
//         if (!patient) return response.sendStatus(404);
//         return response.status(200).send(patient);
//     } catch (error) {
//         console.log(error);
//         return response.status(500).send({ msg: "Error fetching patient by ID" });
//     }
// };

export const getPatientsById = async (request, response) => {
    const { id } = request.params;
    try {
        const customer = await User.findById(id)
            .select("-password") // Exclude password
            .populate({
                path: 'appointments',   // Assuming 'appointments' is the field in User schema
                populate: { 
                    path: 'captain',      // Populate the 'doctor' field inside 'appointments'
                    select: 'name'       // Only fetch the doctor's name
                }
            });
        
        if (!customer) return response.sendStatus(404);
        
        return response.status(200).send(customer);
    } catch (error) {
        console.log(error);
        return response.status(500).send({ msg: "Error fetching customer by ID" });
    }
};


// Update patient
export const updatePatient = async (request, response) => {
    const { id } = request.params;
    const updatedPatientData = request.body;

    try {
        if (updatedPatientData.password) {
            const salt = await bcrypt.genSalt();
            updatedPatientData.password = await bcrypt.hash(updatedPatientData.password, salt); // Hash new password if updated
        }

        const updatedPatient = await User.findByIdAndUpdate(id, updatedPatientData, { new: true }).select("-password");
        if (!updatedPatient) return response.status(400).send({ msg: "Invalid ID." });
        
        return response.status(200).send(updatedPatient);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error updating patient" });
    }
};

// Delete patient
export const deletePatient = async (request, response) => {
    const { id } = request.params;

    try {
        const deletedPatient = await User.findByIdAndDelete(id);
        if (!deletedPatient) return response.status(400).send({ msg: "Invalid ID." });
        
        return response.status(200).send(deletedPatient);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error deleting patient" });
    }
};

// Get appointment details for a patient by ID
export const getAppointmentById = async (request, response) => {
    try {
        const { patientId } = request.params;
        const patient = await User.findById(patientId);
        if (!patient) return response.status(404).send("Patient not found");

        const appointments = patient.appointments;
        if (!appointments.length) return response.status(404).send("No appointments found");

        const appointmentDetails = await Promise.all(
            appointments.map(async (appointmentId) => {
                const appointmentDoctor = await Doctor.findById(appointmentId).select("-password"); // Fetch doctor details without password
                if (!appointmentDoctor) throw new Error("Doctor not found");
                return appointmentDoctor;
            })
        );
        return response.status(200).send(appointmentDetails);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error fetching appointments" });
    }
};

// Update patient's appointments
export const updateAppointments = async (request, response) => {
    try {
        const { body: { dayDate, diagnose }, params: { id } } = request;
        const patient = await User.findById(id);
        if (!patient) return response.status(404).send("Patient not found");

        patient.appointments.push({ dayDate, diagnose }); // Add new appointment

        const savedAppointments = await patient.save();
        response.status(200).json(savedAppointments);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error updating appointments" });
    }
};