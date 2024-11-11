import User from "../models/UserSchema.js";  // Patients are now in the 'User' model
import Captain from "../models/CaptainSchema.js";
import Appointment from "../models/AppointmentSchema.js"; 

// Add a patient to a doctor's history
export const addPatientToDoctor = async (request, response) => {
    try {
        const { doctorID, patientID } = request.params;

        const doctor = await Doctor.findById(doctorID);
        if (!doctor) return response.status(404).send({ msg: "Doctor not found" });

        const patient = await User.findById(patientID);
        if (!patient) return response.status(404).send({ msg: "Patient not found" });

        // Add the patient to the doctor's past patients if not already included
        if (!doctor.pastPatients.includes(patient._id)) {
            doctor.pastPatients.push(patient._id);
        }

        // Add the doctor to the patient's appointments if not already included
        if (!patient.appointments.includes(doctor._id)) {
            patient.appointments.push(doctor._id);
        }

        // Save both updated doctor and patient
        const updatedDoctor = await doctor.save();
        const updatedPatient = await patient.save();

        return response.status(200).json({ updatedDoctor, updatedPatient });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Error adding patient to doctor" });
    }
};

// Fetch a specific patient under a doctor by their IDs
export const fetchPatientFromDoctorById = async (request, response) => {
    try {
        const { doctorID, patientID } = request.params;

        const doctor = await Doctor.findById(doctorID);
        if (!doctor) return response.status(404).send({ msg: "Doctor not found" });

        const patient = await User.findById(patientID).select("-password -appointments");
        if (!patient) return response.status(404).send({ msg: "Patient not found" });

        return response.status(200).json(patient);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Error fetching patient" });
    }
};

// Fetch all patients associated with a specific doctor
export const fetchAllPatients = async (request, response) => {
    try {
        const { doctorId } = request.params;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return response.status(404).send({ msg: "Doctor not found" });

        const patients = doctor.pastPatients;
        if (!patients.length) return response.status(404).send({ msg: "No patients found" });

        // Fetch all patient details associated with the doctor, excluding passwords and appointments
        const patientDetails = await Promise.all(
            patients.map(async (patientID) => {
                const mainPatient = await User.findById(patientID).select("-password -appointments");
                if (!mainPatient) throw new Error("Patient not found");
                return mainPatient;
            })
        );

        return response.status(200).json(patientDetails);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Error fetching patients" });
    }
};

// Adjust import path

export const addAppointment = async (req, res) => {
    const { customerId, date, time, reason } = req.body;
  
    try {
      // Create a new appointment with the correct field for customer
      const newAppointment = new Appointment({
        customer: customerId, // Correct field name here
        date,
        time,
        reason,
      });
  
      await newAppointment.save();
      console.log(req.body);
  
      // Find the customer
      const customer = await User.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      // Add appointment to customer's appointments array
      customer.appointments.push(newAppointment._id);
      await customer.save();
  
      // Send success response
      res.status(201).json({
        message: "Appointment added successfully",
        appointment: newAppointment,
      });
    } catch (error) {
      console.error("Error adding appointment:", error);
      res.status(500).json({ message: "Error adding appointment", error });
    }
  };
  