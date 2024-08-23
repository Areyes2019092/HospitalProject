import {Schema, model} from "mongoose"

const UserSchema = new Schema({
    DPI: {
        type: String,
        required: true,
        unique: [true, "DPI number is already registered"]
    },
    passportNumber:{
        type: String,
        required: false,
        unique: [true, "Passport number is already registered"]
    },
    name:{
        type: String,
        required: [true, "The name is required"]
    },
    lastName:{
        type: String,
        required: [true, "The last name is required"]
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
        enum: ["DOCTOR", "NURSE", "PATIENT", "OTHER"]
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

export default model( "User" ,UserSchema)