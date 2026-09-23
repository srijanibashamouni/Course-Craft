const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
        return res.status(400).json({
            message: "Email is not registered, please register"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign(
        { id: existingUser._id },
        process.env.SECRET_KEY
    );

    return res.status(200).json({
        message: "Login successful",
        token: token
    });
}

async function register(req, res) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        return res.status(400).json({
            message: "Email already registered"
        });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name: name,
        email: email,
        password: encryptedPassword,
        role: role
    });

    const token = jwt.sign(
        { id: newUser._id },
        process.env.SECRET_KEY
    );

    return res.status(200).json({
        message: "User registered successfully",
        token: token
    });
}

module.exports = { login, register };