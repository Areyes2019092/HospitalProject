import Question from "./question.model.js";

export const createQuestion = async (req, res) =>{
    try{
        


    }catch(error){
        return res.status(500).json({msg:"Internal Error 500", error:error.message});
    }

}









/*
export const createQuestion = async (req, res) => {
    try {
        const { text, options, form } = req.body;
        const question = new Question({ text, options, form });
        await question.save();
        res.status(201).json({ msg: 'Question created successfully', question });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const getQuestions = async (req, res) => {
    try {
        const { formId } = req.params;
        const questions = await Question.find({ form: formId }).populate('options');
        res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};


*/