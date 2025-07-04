import { create } from "domain";
import { Router } from "express";
import User from "../models/Users.js";

const createUserRoute = Router();

createUserRoute.post("/", async (req, res) => {
    try{
        const { nameValue, passwordValue, roleValue } = req.body;
        console.log("Received create user request with values:", { nameValue, passwordValue, roleValue });

        if (!nameValue || !passwordValue || !roleValue) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const newUser = await User.create({
            userName: nameValue,
            password: passwordValue,
            role: roleValue
        });
        res.status(200).json({
            message: "User created successfully",
            user: {nameValue, roleValue, userId: newUser.userId}});
        console.log("User created successfully:", newUser);
    }catch(error){
        console.error("Error in createUserRoute:", error);
        res.status(500).json({ message: "Internal server createuserroute error" });
    }

})

export default createUserRoute;