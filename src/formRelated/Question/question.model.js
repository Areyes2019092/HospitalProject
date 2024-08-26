import {Schema, model} from "mongoose"
import OptionSchema from "../Option/option.model.js";

const QuestionSchema = new Schema({
    text: String,
    options:[OptionSchema]
});

export default moongose.model('Question', QuestionSchema)

/*
QuetionSchema.methods.toJSON = function () {
    const { __v, ...question } = this.toObject();
    question.uid = _id;
    return question;
}

*/
