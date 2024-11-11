import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Captain from '../models/CaptainSchema.js';

// Register function
export const register = async (request, response) => {
    const {
        name,
        email,
        phone,
        password,
        bio,
        specialization,
        about,
        totalRating,
        averageRating,
        appointments,
        reviews,
        role
    } = request.body;

    try {
        // Generate a salt with 10 rounds
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new captain instance
        const newCaptain = new Captain({
            name,
            email,
            phone,
            password: hashedPassword,
            bio,
            specialization,
            about,
            totalRating,
            averageRating,
            appointments,
            reviews,
            role
        });

        // Save the new captain in the database
        const savedCaptain = await newCaptain.save();

        // Return the saved captain data with a success response
        return response.status(200).send(savedCaptain);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ msg: "Error registering captain" });
    }
};

// Login function
export const login = async (request, response) => {
    try {
        const { email, password } = request.body;

        // Find captain by email
        const captain = await Captain.findOne({ email });
        if (!captain) return response.status(404).json({ msg: "Captain not found" });

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, captain.password);
        if (!isMatch) return response.status(400).json({ msg: "Invalid Credentials" });

        // Generate a JWT token
        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET);

        // Exclude the password from the response
        const { password: _, ...captainWithoutPassword } = captain._doc;

        // Return the token and captain data without password
        response.status(200).json({ token, captain: captainWithoutPassword });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error logging in" });
    }
};
