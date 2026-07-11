const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailService');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required"
      });
    }

    const userExists = await User.findOne({
      email: email.toLowerCase()
    });

    if (userExists) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const user = await User.create({
      username: username.trim(),
      email: email.toLowerCase(),
      password,
      otp,
      otpExpiry
    });

    try {
      await sendEmail({
        to: user.email,
        subject: "Email Verification OTP",
        text: `Your OTP is ${otp}`
      });
    } catch (err) {
      console.log(err.message);
    }

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
      email: user.email
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ message: 'User ID and OTP are required' });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ message: 'OTP must be a 6-digit number' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified. Please login.' });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: 'No OTP found. Please register again.' });
    }

    if (Date.now() > user.otpExpiry.getTime()) {
      return res.status(400).json({ message: 'OTP has expired. Please register again.' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      message: 'Email verified successfully!'
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ 
        message: 'Please verify your email first',
        userId: user._id
      });
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      message: 'Login successful!'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};