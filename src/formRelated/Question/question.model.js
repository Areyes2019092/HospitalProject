import { Schema, mongoose } from "mongoose";

const QuestionSchema = new Schema({
    questionName:{
        type: String,
        required: true
    },
    options:{
        type: Schema.Types.ObjectId,
        ref: "Option"
    },
    form:{
        type: Schema.Types.ObjectId,
        ref: "Form"
    }
})

export default mongoose.model("Question", QuestionSchema)



