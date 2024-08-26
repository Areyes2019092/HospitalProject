import Option from "./option.model.js";

export const createOption = async(req, res) =>{
    const allowedUser = req.user;
    if(allowedUser.admin !== true){
        return res.status(400).json({
            msg: "you cannot access this function"
        });
    }
    const { text, value } = req.body;
    const newOption = new Option({text, value});
    await newOption.save();
    res.status(200).json(newOption);
}

