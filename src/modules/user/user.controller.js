import bcryptjs from "bcryptjs";
import User from "./user.model.js";
import { generateJWT } from "../../helpers/JWTGenerator.js";


export const getAllUsers = async (req, res) =>{
   try{
    const userAllowed = req.user;
    if( userAllowed.admin !== true ){
        return res.status(400).json({msg: "User cant do this action"});
    }
    const showUsers = await User.find({status: true});
    res.status(200).json({showUsers})
    }catch(e){
        return res.status(500).json({msg:'Internal error try again later', e})
    }
}

export const login = async(req, res) =>{
   try{
    const { DPI, password } = req.body;
    var user = await User.findOne({user: DPI});
    if(!user){
        return res.status(400).json({msg: "User is not registered"})
    }
    const log = bcryptjs.compareSync(password, user.password);
    if(!log){
        return res.status(400).json({msg: "Wrong data"});
    }
    const token = await generateJWT(user.id);
    res.status(200).json({msg: `Welcome, your token is ${token}`});
   }catch(error){
    return res.status(500).json(error.message)
   }
}


export const register = async (req, res) => {
    const { DPI, passportNumber, name, lastName, phone, password, role } = req.body;
    try {
        
        let admin = false;
        if (role === "OTHER") {
            if (password === "!2M0nat!!#cms_rSsg30&&&") {
                admin = true;
            }else{
                return res.status(400).json({msg: 'Wrong data'})
            }
        }

        const hashedPass = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            DPI,
            passportNumber: passportNumber,
            name,
            lastName,
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
                passportNumber: newUser.passportNumber,
                name: newUser.name,
                lastName: newUser.lastName,
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