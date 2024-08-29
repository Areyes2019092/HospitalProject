import bcryptjs from "bcryptjs";
import Personal from "./personal.model.js";
import User from "../user/user.model.js";
import urgencyLevelModel from "../urgencyLevel/urgencyLevel.model.js";
import { generateJWT } from "../../helpers/JWTGenerator.js";

export const login = async(req, res) =>{
    try{
     const { DPI, password } = req.body;
     var user = await Personal.findOne({DPI: DPI});
     if(!user){
         return res.status(400).json({msg: "User is not registered"})
     }
     const log = bcryptjs.compareSync(password, user.password);
     if(!log){
         return res.status(400).json({msg: "Wrong data"});
     }
     const token = await generateJWT(user.id);
     res.status(200).json({msg: `Welcome, your token is: ${token}`});
    }catch(error){
     return res.status(500).json(error.message)
    }
 }
 
 /*
export const register = async (req, res) => {
    const { DPI, passportNumber, name, lastName, urgencyLevel , phone, password, role } = req.body;
    let admin = false;
    if (role === "OTHER") {
        if (password === "!2M0nat!!#cms_rSsg30&&&") {
            admin = true;
        }else{
            return res.status(400).json({msg: 'Wrong data'})
        }
    }
    try {
        if(!Personal.DPI){
            const hashedPass = bcryptjs.hashSync(password, 10);
            const newUser = new Personal({
                passportNumber: passportNumber,
                name,
                lastName,
                urgencyLevel,
                phone,
                role,
                password: hashedPass,
                admin
            });
    
            await newUser.save();
    
            res.status(200).json({
                msg: 'User registered successfully',
                user: {
                    passportNumber: newUser.passportNumber,
                    name: newUser.name,
                    lastName: newUser.lastName,
                    urgencyLevel: newUser.urgencyLevel,
                    phone: newUser.phone,
                    role: newUser.role,
                    status: newUser.status,
                    admin: newUser.admin
                }
            });
        if(!Personal.passportNumber){
            const hashedPass = bcryptjs.hashSync(password, 10);
            const newUser = new Personal({
                DPI,
                name,
                lastName,
                urgencyLevel,
                phone,
                role,
                password: hashedPass,
                admin
            });
    
            await newUser.save();
    
            res.status(200).json({
                msg: 'User registered successfully',
                user: {
                    DPI: newUser.DPI,
                    name: newUser.name,
                    lastName: newUser.lastName,
                    urgencyLevel: newUser.urgencyLevel,
                    phone: newUser.phone,
                    role: newUser.role,
                    status: newUser.status,
                    admin: newUser.admin
                }
            });
        }
        if(!Personal.DPI && !Personal.passportNumber){
            res.status(400).json({msg:"You must provide once between DPI or Passport number"})
        }
    
        }
            } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Problems with registration, please try again later',
            error: e.message
        });
    }
};
 
*/

export const register = async (req, res) => {
    const { DPI, passportNumber, name, lastName, urgencyLevel , phone, password, role } = req.body;
    let admin = false;
    if (role === "OTHER") {
        if (password === "!2M0nat!!#cms_rSsg30&&&") {
            admin = true;
        }else{
            return res.status(400).json({msg: 'Wrong data'})
        }
    }
    try {
        
        if(!DPI && !passportNumber){
            res.status(400).json({msg:"You must provide once between DPI or Passport number"})
        }
      
            const hashedPass = bcryptjs.hashSync(password, 10);
            const newUser = new Personal({
                DPI,
                passportNumber,
                name,
                lastName,
                urgencyLevel,
                phone,
                role,
                password: hashedPass,
                admin
            });
    
            await newUser.save();
            await urgencyLevelModel.findByIdAndUpdate( urgencyLevel, { $push: { personals: newUser._id } } )
            res.status(200).json({
                msg: 'User registered successfully',
                user: {
                    DPI: newUser.DPI,
                    passportNumber: newUser.passportNumber,
                    name: newUser.name,
                    lastName: newUser.lastName,
                    urgencyLevel: newUser.urgencyLevel,
                    phone: newUser.phone,
                    role: newUser.role,
                    status: newUser.status,
                    admin: newUser.admin
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



export const getAllUsers = async (req, res) =>{
    try{
     const userAllowed = req.user;
     if( userAllowed.admin !== true ){
         return res.status(400).json({msg: "User cant do this action"});
     }
     const showUsers = await User.find({status: true});
     res.status(200).json({showUsers})
     }catch(error){
         return res.status(500).json(error.message)
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
            return res.status(404).json({msg: "There is no personal asigned"})
        }
        res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json(error.message);
    }
 }
    