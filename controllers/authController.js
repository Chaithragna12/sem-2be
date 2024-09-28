import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        });
        await newUser.save();
        res.status(200).json({ success: true, message: 'Successfully created' });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'Username or email already exists' });
        }
        console.error('Error during registration:', err);
        res.status(500).json({ success: false, message: 'Failed to create. Try again' });
    }
};


export const login = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }
        const { password, role, ...rest } = user._doc;
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });
        const expirationDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days from now

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only set secure in production
            expires: expirationDate
        }).status(200).json({ token, data: { ...rest }, role });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ success: false, message: 'Failed to login' });
    }
};
