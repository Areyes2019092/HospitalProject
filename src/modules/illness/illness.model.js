import mongoose, { Schema, model} from "mongoose";

const IllnessSchema = new Schema({
    name: {
        type: String,
        required: [true, "Illness must have a name"]
    },
    description:{
        type: String,
        required: [true, "Illness must have a description"]
    },
    urgencyLevel:{
        type: Schema.Types.ObjectId,
        ref: ""
    }

});

IllnessSchema.methods.toJSON = function(){
    const { __v, _id, ...resto } = this.toObject();
    resto.uid = _id;
    return resto;
};

export default mongoose.model("Illness", IllnessSchema)