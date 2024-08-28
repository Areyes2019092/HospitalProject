import Question from "../Question/question.model.js"
import Option from "../Option/option.model.js"
import Form from "./form.model.js"


/*
Mongoose's populate is a powerful feature that allows you to automatically replace a path in a document with documents from 
another collection. 
This is akin to a SQL join, but it's a part of Mongoose's API for MongoDB, a NoSQL database.


*/

export const createForm = async(req, res) =>{
    try{
        const { name, description, questions } = req.body;
        const formNode = new Form({ name, description, questions });
        await formNode.save();
        res.status(200).json({msg:"Form created successfully", formNode})
    }catch(error){
        res.status(500).json({msg: "Internal Error 500 createForm Controller", error: error.message});
    }
}

export const getForms = async (req, res) =>{
    try{
        const formsVar  = await Form.find().populate({
            path: 'questions',
            populate: { path: 'options' }
        })
        res.status(200).json(formsVar)
    }catch(error){
        return res.status(500).json({msg:"Internal Error 500 getForms", error: error.message})
    }
}

export const calculateResult = async(req, res) =>{
    try{
        const { formId, selectedOptions } = req.body;
        const form = await Form.findById(formId).populate({
            path: 'questions',
            populate: { path: 'options' },
        });

        let totalScore = 0;
        selectedOptions.forEach(optionId =>{
            const option = form.questions.flatMap(q => q.options).find(opt => opt.id === optionId);
            if(option){
                totalScore += option.value;
            }
        });
        let result;
        if(totalScore < 20){
            result = 'MINOR';
        }else if(totalScore < 40){
            result = 'MID';
        }else{
            result = 'SEVERE';
        }
        res.status(200).json({totalScore, result});
    }catch(error){
        res.status(500).json({msg: "Internal Server 500 calculateResult", error: error.message});
    }
}


