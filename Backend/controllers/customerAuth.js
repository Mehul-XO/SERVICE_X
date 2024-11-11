import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';

// Register function
export const register = async (request, response) => {
    const {
        name,
        email,
        phone,
        password,
        gender,
        role // Include role in the destructuring
    } = request.body;

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            gender,
            role // Save role to the user instance
        });

        // Save the new user in the database
        const savedUser = await newUser.save();

        // Return the saved user data with a success response
        return response.status(200).send(savedUser);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ msg: "Error registering user" });
    }
};

// Login function
export const login = async (request, response) => {
    try {
        const { email, password } = request.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return response.status(404).json({ msg: "User not found" });

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return response.status(400).json({ msg: "Invalid Credentials" });

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Exclude the password from the response
        const { password: _, ...userWithoutPassword } = user._doc;

        // Return the token and user data without the password
        response.status(200).json({ token, user: userWithoutPassword });
        console.log("Login success");
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error logging in" });
    }
};
