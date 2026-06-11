const User = require("../Model/auth.model");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const Blacklist = require("../Model/blacklist.model");
const crypto = require('crypto');
const sendEmail = require('../Service/email.service');
/**
 * @name registerUser
 * @description Register a new user
 * @async
 * @throws {Error} If the user registration fails
 * @access Public
 * @route POST /api/auth/register
 * 
 */
const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await new User({ userName, email, password: hashPassword }).save();

        const token = jwt.sign({ id: user._id, userName, email }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        })



        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @name loginUser
 * @description Login a user,email and password are required
 * @async
 * @throws {Error} If the user login fails
 * @access Public
 * @route POST /api/auth/login
 * 
 */

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id, userName: user.userName, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({ message: "User logged in successfully", user: { id: user._id, userName: user.userName, email: user.email } });
    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @name Logout 
 * @description Logout a user by clearing the token cookie
 * @async
 * @throws {Error} If the user logout fails
 * @access Private
 * @route POST /api/auth/logout
 */

const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            await new Blacklist({ token }).save();
        }
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        return res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
        console.error("Error in user logout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @name Get Me
 * @description Get the logged in user
 * @async
 * @throws {Error} If the user is not logged in
 * @access Private
 * @route GET /api/auth/getme
 */

const getMe = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(200).json({ message: "Not authenticated", user: null });
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(200).json({ message: "User not found", user: null });
        }
        res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        console.error("Error in fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @name forgotPassword
 * @description Request a password reset link
 * @async
 * @access Public
 * @route POST /api/auth/forgot-password
 */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate token
        const resetToken = crypto.randomBytes(20).toString('hex');
        
        // Hash token and save to DB
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour

        await user.save();

        // Create reset URL
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        const resetUrl = `${clientUrl}/reset-password/${resetToken}`;
        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on the link below to set a new password:\n\n${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset Request",
                message: message,
            });

            res.status(200).json({ message: "Email sent successfully" });
        } catch (error) {
            console.error("Error sending email:", error);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return res.status(500).json({ message: "Email could not be sent" });
        }

    } catch (error) {
        console.error("Error in forgot password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @name resetPassword
 * @description Reset user's password using token
 * @async
 * @access Public
 * @route POST /api/auth/reset-password/:token
 */
const resetPassword = async (req, res) => {
    try {
        const resetToken = req.params.token;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Hash token to compare with DB
        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        // Set new password
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error in reset password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser, logoutUser, getMe, forgotPassword, resetPassword };
