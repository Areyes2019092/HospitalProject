import { Schema, mongoose } from "mongoose";

const ResultSchema = new Schema({ 
    userId:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    formId:[{
        type: Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    }],
    selectedOptionsId:[{
        type: Schema.Types.ObjectId,
        ref: 'Option',
        required: true
    }],
    totalScore:{
        type: Number,
        required: true
    },
    result:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }

})

export default mongoose.model("Response", ResultSchema);

