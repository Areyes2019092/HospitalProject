import bcryptjs from "bcryptjs";
import User from "./user.model.js";
import Personal from "../personal/personal.model.js";
import { generateJWT } from "../../helpers/JWTGenerator.js";


export const register = async (req, res) => {
    const { DPI, passportNumber, name, lastName, phone } = req.body;
    const userAllowed = req.user;
    if(!(userAllowed.role === "NURSE" || userAllowed.role === "DOCTOR" || userAllowed.role === "OTHER")){
        res.status(400).json({msg: "You cannot acces to this function"})
    }
    try {
      
        const newUser = new User({
            DPI,
            passportNumber: passportNumber,
            name,
            lastName,
            phone,
        });

        await newUser.save();

        res.status(200).json({
            msg: 'User registered successfully',
            user: {
                DPI: newUser.DPI,
                passportNumber: newUser.passportNumber,
                name: newUser.name,
                lastName: newUser.lastName,
                phone: newUser.phone,
                status: newUser.status,
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Problems with registration, please try again later',
            error: e.message
        });
    }
};



