import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";  // If you want to use JWT for token-based authentication



// Create a new user
export const createNewUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        console.log(req.body);

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,  // Save the hashed password
        });

        res.status(201).json({ success: true, user: newUser, message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Compare password with hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // // Optionally create a JWT token
        // const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // res.status(200).json({
        //     success: true,
        //     message: 'Login successful',
        //     token,  // Send the token if you plan to use it for session management
        //     user: { id: user._id, email: user.email, firstname: user.firstname, lastname: user.lastname }
        // });
        res.status(201).json({ success: true,  message: 'Login successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
