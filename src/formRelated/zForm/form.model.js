import mongoose from "mongoose";
import ResponseSchema from "../response.model.js";

const FormSchema = new mongoose.Schema({
    responses: [ResponseSchema],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submittedAt: { 
        type: Date,  
        default: Date.now
    }
});

export default mongoose.model('Form', FormSchema)