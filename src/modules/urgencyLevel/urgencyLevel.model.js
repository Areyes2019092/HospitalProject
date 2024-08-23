import mongoose from "mongoose";

const UrgencySchema = mongoose.Schema({
    name: {
        type: String,
        enum: ["MINOR","MID", "SEVERE"]
    }
    
})

UrgencySchema.methods.toJSON = function(){
    const { __v, _id, ...urgency } = this.toObject();
    urgency.id = _id;
    return urgency  
}

export default mongoose.model("Urgency", UrgencySchema);