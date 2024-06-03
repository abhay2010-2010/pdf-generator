const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Users = require('../schema/user.schema');
const userRoutes = express.Router();

userRoutes.post('/register', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const hash = bcrypt.hash(req.body.password, 10, async (error, paswd) => {
            const newUser = new Users({
                name: req.body.name,
                email: req.body.email,
                password: paswd,
                role: req.body.role
            })
            const savedUser = await newUser.save();
            res.status(200).json({ msg: "User registered successfully", user: savedUser });
        })

    } catch (error) {
        res.status(400).json({ msg: "Fail to register", error: error });
    }

});

userRoutes.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }
        const token = jwt.sign({ _id: user._id }, "masai");
        res.status(200).json({ msg: "User logged in successfully", token: token });
    } catch (error) {
        res.status(400).json({ msg: "Fail to login", error: error });
    }
});

module.exports = {
    userRoutes
}