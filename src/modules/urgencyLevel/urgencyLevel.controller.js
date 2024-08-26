import { response, request } from "express";
import urgencyLevel from "./urgencyLevel.model.js";
import User from "../user/user.model.js";
import Personal from "../personal/personal.model.js";
import urgencyLevelModel from "./urgencyLevel.model.js";

export const getCategories = async(req, res) => {
    const userAllowed = req.user;
    if(userAllowed.admin !== true){
        return res.status(400).json({msg:"User cant do this action"})
    }
    try{
    const categories = await urgencyLevelModel.find({status: true});
    res.status(200).json({categories});
    }catch(error){
        return res.status(500).json(error.message)
    }
}


export const registerUrgencyLevel = async(req, res) =>{
    const { name } = req.body;
    const userAllowed = req.user;
    if(userAllowed.admin !== true){
        return res.status(400).json({
            msg: "you cannot access this function"
        });
    }
    try{
        if(!/^[A-Z]+$/.test(name)){
            return res.status(400).json({
                msg: 'Category name must be in uppercase letters without spaces'
            });
        };
        const urgencyLevel = new urgencyLevelModel({name});
        await urgencyLevel.save();
        res.status(200).json(urgencyLevel)
    }catch(e){
        console.error(e);
        res.status(500).json({
            msg: 'Error registering urgency level',
            error: e.message
        });
    }
}


/*
export const assignPersonalToUrgency = async (req, res) => {
    const { dpi, urgencyId } = req.body;

    try {

        const personal = await Personal.findOne({ DPI: dpi });
        if (!personal) {
            return res.status(404).json({
                msg: "Personal not found with the provided DPI",
            });
        }

        const urgency = await urgencyLevel.findById(urgencyId);
        if (!urgency) {
            return res.status(404).json({
                msg: "Urgency level not found",
            });
        }

        // Asignar el personal al nivel de urgencia
        urgency.personal = personal._id;
        await urgency.save();

        res.status(200).json({
            msg: "Personal successfully assigned to urgency level",
            urgency,
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error assigning personal to urgency level',
            error: e.message
        });
    }
};
*/
