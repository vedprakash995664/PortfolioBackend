const bcrypt = require("bcryptjs");
const Admin = require("../Models/AdminModal");

exports.registerAdmin = async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({ userName, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        console.error("Error saving Admin", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.loginAdmin = async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const admin = await Admin.findOne({ userName });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error("Error logging in", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
