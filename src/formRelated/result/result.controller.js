import Result from "./result.model.js";
import Form from "../zForm/form.model.js";
import Option from "../Option/option.model.js";



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








/*
try {
        const { formId, selectedOptions, userId } = req.body;

        // Find the form and populate the questions and their options
        const form = await Form.findById(formId).populate({
            path: 'questions',
            populate: {
                path: 'options',
            },
        });

        // Calculate the total score based on selected options
        let totalScore = 0;

        selectedOptions.forEach(optionId => {
            const option = form.questions.flatMap(q => q.options).find(opt => opt.id === optionId);
            if (option) {
                totalScore += option.value;
            }
        });

        // Determine the result based on the total score
        let result;
        if (totalScore < 50) {
            result = 'Low';
        } else if (totalScore < 100) {
            result = 'Medium';
        } else {
            result = 'High';
        }

        // (Optional) Save the response to the database
        const response = new Response({ userId, formId, selectedOptions, totalScore, result });
        await response.save();

        // Send back the calculated result
        res.status(200).json({ totalScore, result });


*/
