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
    questions: {
        type: Schema.Types.ObjectId,
        ref: "Question" 
    }

})

export default mongoose.model("Form", FormSchema);


/*

const FormSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "The name is required"] 
    },
    description:{
        type: String,
        required: [true, "The description of the form must be obligatory"]
    },
    questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

*/ 