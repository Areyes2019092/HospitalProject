import { Schema, mongoose } from "mongoose";

const FormSchema = new Schema({
    name:{
        type: String,
        required: [ true, "The name of the forms is obligatory" ]
    },
    description:{
        type: String,
        required: [ true, "The description is obligatory" ]
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "Question" 
    }]
});



export default mongoose.model("Form", FormSchema);

