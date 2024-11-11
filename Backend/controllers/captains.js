import Captain from '../models/CaptainSchema.js';

export const getAllDoctors = async (request, response) => {
    try {
        const { query: { name, specialization } } = request;

        // If no query parameters are provided, return all captains
        if (!name && !specialization) {
            const captains = await Captain.find().select('-password'); // Exclude the password field
            if (!captains.length) return response.sendStatus(404); // No captains found
            return response.status(200).send(captains);
        } else {
            // Create a filter object based on provided query parameters
            const filter = {};
            if (name) {
                filter.name = { $regex: name, $options: 'i' }; // Case-insensitive match for name
            }
            if (specialization) {
                filter.specialization = { $regex: specialization, $options: 'i' }; // Case-insensitive match for specialization
            }

            // Fetch captains based on the filter criteria
            const captains = await Captain.find(filter).select('-password'); // Exclude the password field
            if (!captains.length) return response.sendStatus(404); // No captains found
            return response.status(200).send(captains);
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error fetching captains" });
    }
};

// Get Captain by ID
export const getDoctorsById = async (request, response) => {
    const { id } = request.params;
    try {
        const captain = await Captain.findById(id).select('-password'); // Exclude the password field
        if (!captain) return response.sendStatus(404);
        return response.status(200).send(captain);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error fetching captain by ID" });
    }
};


// Update Captain
export const updateCaptain = async (request, response) => {
    const { id } = request.params;
    const updatedData = request.body;

    try {
        if (updatedData.password) {
            const salt = await bcrypt.genSalt();
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        const updatedCaptain = await Captain.findByIdAndUpdate(id, updatedData, { new: true }).select('-password'); // Return updated Captain without password
        if (!updatedCaptain) return response.status(400).send({ msg: "Invalid ID." });
        
        return response.status(200).send(updatedCaptain);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error updating Captain" });
    }
};

// Delete Captain
export const deleteCaptain = async (request, response) => {
    const { id } = request.params;

    try {
        const deletedCaptain = await Captain.findByIdAndDelete(id);
        if (!deletedCaptain) return response.status(400).send({ msg: "Invalid ID." });
        
        return response.status(200).send(deletedCaptain);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error deleting Captain" });
    }
};