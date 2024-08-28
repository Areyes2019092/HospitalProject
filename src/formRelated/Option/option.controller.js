import Option from "./option.model.js";
import Question from "../Question/question.model.js";

export const createOption = async (req, res) =>{
    try{
        const { name, value, question } = req.body;
        const newOption = new Option({ name, value, question});
        await newOption.save();
        await Question.findByIdAndUpdate(question, { $push: { options: newOption._id } });
        res.status(200).json({msg: "Option Created Successfully", newOption});
    }catch(error){
        return res.status(500).json({msg: "Internal Error 500 createOption", error:error.message})
    }

}


export const getOptions = async (req, res) =>{
    try{
        const { id } = req.params;
        const getOptions = await Option.find(id);
        res.status(200).json({msg: "Options:", getOptions}) 
    }catch(error){
        return res.status(500).json({msg: "Internal Error 500 getOptions", error:error.message});
    }
}

















