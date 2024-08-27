
import {Schema, model} from "mongoose"

const PersonalSchema = new Schema({
    DPI: {
        type: String,
        required: false,
        sparse: true
    },
    passportNumber:{
        type: String,
        required: false,
        sparse: true
    },
    name:{
        type: String,
        required: [true, "The name is required"]
    },
    lastName:{
        type: String,
        required: [true, "The last name is required"]
    },
    urgencyLevel:{
        type: String,
        required: [true,"This urgency level does not exist"]
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    role:{
        type: String,
        enum: ["DOCTOR", "NURSE", "OTHER"]
    },
    status:{
        type: Boolean,
        default: true
    },
    admin: {
        type: Boolean,
        default: false
    },

})


PersonalSchema.methods.toJSON = function () {
    const { __v, password, _id, ...personal_ } = this.toObject();
    personal_.uid = _id;
    return personal_;
}


export default model( "Personal" ,PersonalSchema)