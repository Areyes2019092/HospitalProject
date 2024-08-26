import { generateJWT } from "../../helpers/JWTGenerator.js";
import Illness from "./illness.model.js";

export const registerIllness = async(req, res) =>{
    const allowedUser = req.user;
    if(allowedUser.admin !== true){
        return res.status(400).json({
            msg: "you cannot access this function"
        });
    }
    const { name, description, urgencyLevel } = req.body;
    try{
        const illnesss = new Illness({name, description, urgencyLevel});
        await illnesss.save();
        res.status(200).json({msg: `New Illness registered:`,
            illness:{
                name: illnesss.name,
                description: illnesss.description,
                urgencyLevel: illnesss.urgencyLevel
            }
        })
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

export const getAllIllness = async(req, res) =>{
    try{
        const userAllowed = req.user;
        if(userAllowed.admin !== true){
            return res.status(400).json({msg: "User cant do this action"});
        }
        const showIllness = await Illness.find();
        res.status(200).json({showIllness});
    }catch(error){
        return res.status(500).json(error.message);
    }

};


export const getIllnessByUrgencyLevel = async(req, res) =>{
    try{
        const userAllowed = req.user;
        if(userAllowed.admin !== true){
            return res.status(400).json({ msg: "User can't do this action" });
        };
        const { byUrgencyLevel } = req.body;
        const illnessesBy = await Illness.find({urgencyLevel: byUrgencyLevel});
        if(!illnessesBy){
            return res.status(404).json({msg: "There is no illnesses assigned"})
        }

    }catch(error){
        return res.status(500).json(error.message);
    }
} 


export const getAllPersonalByRole = async (req, res) => {
    try {
        const userAllowed = req.user;
        if (userAllowed.admin !== true) {
            return res.status(400).json({ msg: "User can't do this action" });
        }
        const { byRole } = req.body; 
        const users = await Personal.find({role: byRole})
        if (!users) {
            return res.status(404).json({msg: "There is no personal assigned"})
        }
        res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json(error.message);
    }
 }
    