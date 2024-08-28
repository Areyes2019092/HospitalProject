import Question from "./question.model.js";
import formModel from "../zForm/form.model.js";

export const createQuestion = async (req, res) =>{
    try{
        const { questionName, options, form } = req.body;
        const questionVar = new Question({ questionName, options, form });
        await questionVar.save();
        await formModel.findByIdAndUpdate( form, { $push: { questions: questionVar._id } } )
        //Above is for update Form too
        res.status(200).json({msg:"New question created successfully", questionVar})
    }catch(error){
        return res.status(500).json({msg:"Internal Error 500 createQuestion controller", error:error.message});
    }
};

export const getQuestions = async (req, res) => {
    try{
        const { formId } = req.params;
        const getQuestions = await Question.find({ form: formId }).populate('options');
        res.status(200).json({msg:"Questions are:", getQuestions})
    }catch(error){
        return res.status(500).json({msg: "Internal Error 500 getQuestions controller", error: error.message})
    }
}








