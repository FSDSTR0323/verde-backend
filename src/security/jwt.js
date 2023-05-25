const express = required("express");
const jwt = require("jsonwebtoken");
const Agent= require("../models/agent.model");
const jwtSecret = process.env.JWT_SECRET;

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    const email = req.body.email;
    const data =  req.body;
    console.log(req.body);
    // * Make sure request has the email
    if (!email) {
        return res.status(400).json({ error: { register: "Email not recieved"} });
    }
    const existingAgent = await Agent.findOne( { email: email });
    // * If the user is found, return an error because there is already a agent registered
    if (existingAgent) {
        return res
            .status(400)
            .json( { error: { email: "Email already registered"} });
    } else {
        const newAgent = new Agent({
            email: data.email,
            password: data.password,
            firstName: data.firsNAme,
        });
    const savedAgent = await newAgent.save();
    if (savedAgent) {
        return res.status(201).json({
            token: savedAgent.generateJWT(),
            Agent: {
                email: savedAgent.email,
                name: savedAgent.name,
                id: savedAgent._id,
            }, 
        });
    } else {
        return res
            .status(500)
            .json({ error: { firstName: "Error creating new Agent : ", error} });
    }  
  }
});

// ! -----------------------------------------

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // * Validate, email and password were provided in the request
    if (!email || !password) {
        return res
            .status(400)
            .json({ error: { login: "Missing email or password" } });
    }
    try {
        const foundAgent = await Agent.findOne({ email });
        if (!foundAgent) {
            return res
            .status(400)
            .json({ error: { email: "Agent not found, please Register"} });
        }
    // * Validate password with bcrypt library    
    // * if everything is ok, return the new token and user data
    return res.status(200).json({
        token: foundAgent.generateJWT(),
        user: {
        email: foundAgent.email,
        name: foundAgent.name,
        id: foundAgent._id,
        },
    });
    } catch (err) {
    return res
        .status(500)
        .json({ error: { register: "Error Login in :(", error: err.message } });
        }
}

)