import {Schema, model} from "mongoose"

const UserSchema = new Schema({
    DPI: {
        type: Number,
        unique: [true, "DPI number is already registered"],
        sparse: true
    },
    passportNumber:{
        type: String,
        unique: [true, "Passport number is already registered"],
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
    phone:{
        type: String,
        required: [true, "Phone number is required"]
    },
    role:{
        type: String,
        default: "PATIENT"
    },
    status:{
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export default model( "User" , UserSchema)