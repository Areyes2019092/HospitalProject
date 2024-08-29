import mongoose, { Schema } from "mongoose";

const UrgencySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The urgency name is required"],
        validate:{
            validator: function(v){
                return /^[A-Z]+$/.test(v);
            },
            message: props => `${props.value}The category must be writen in CAPITAL LETTERS`
        }
    },
    personals:[{
        type: Schema.Types.ObjectId,
        ref: 'Personal'
    }],
    illnesses:[{
        type: Schema.Types.ObjectId,
        ref: 'Illness'
    }],
    status:{
        type: Boolean,
        default: true,
    },
});

UrgencySchema.methods.toJSON = function(){
    const { __v, _id, status , ...urgency_ } = this.toObject();
    urgency_.uid = _id;
    return urgency_;
}

export default mongoose.model("Urgency", UrgencySchema);