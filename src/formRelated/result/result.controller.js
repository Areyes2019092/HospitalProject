import Result from "./result.model.js";
import Form from "../zForm/form.model.js";
import User from "../../modules/user/user.model.js"
import Option from "../Option/option.model.js";


export const getResult = async(req, res) => {
    try{
        const getResults = await Result.find().populate({path: 'userId'}).populate({path: 'formId'}).populate({path: 'selectedOptionsId'});
        res.status(200).json({getResults});
    }catch(e){
        return res.status(500).json({msg: "Internal Error 500 getResult result controller"})
    }
}


export const calculateResult = async(req, res) =>{
    try{
        const { formId, selectedOptions, userId } = req.body;
        const form = await Form.findById(formId).populate({
            path: 'questions',
            populate:{
                path: 'options'
            },
       });

       let totalScore = 0;
       selectedOptions.forEach( optionId => {
            const option = form.questions.flatMap( sss => sss.options ).find( a => a._id.toString()=== optionId );
            if(option){
                totalScore += option.value;
            }
       });

       let result;
       if(totalScore < 15){
            result = 'MINOR';
       } else if (totalScore < 30){
            result = 'MID'
       }else{
            result = 'SEVERE'
       }

       const formResult = new Result({
            userId,
            formId,
            selectedOptionsId: selectedOptions,
            totalScore,
            result
       })

       await formResult.save();
       res.status(200).json({msg:'Your result is:', formResult});


    }catch(error){
        return res.status(500).json({msg: 'Internal Error 500 calculateResult', error: error.message})
    }
}



