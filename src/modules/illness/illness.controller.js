import { generateJWT } from "../../helpers/JWTGenerator.js";
import Illness from "./illness.model.js";

export const registerIllness = async(req, res) =>{
    const { name, description, urgencyLevel } = req.body;
    const allowedUser = req.user;
    if(allowedUser.admin !== "true"){
        return res.status(400).json({
            msg: "you cannot access this function"
        });
    }
    try{
        const illnesss = new Illness({name, description, urgencyLevel});
        await illnesss.save();
        res.status(200).json({msg: `New Illness registered ${illnesss}`})
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}


