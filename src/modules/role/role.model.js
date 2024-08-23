/*
import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
    roleTypes:{
        type: String,
        enum: ['ADMIN', 'DOCTOR', 'NURSE', 'PATIENT'],
        default: "PATIENT"
    }
})

RoleSchema.methods.toJSON = function(){
    const { __v, _id, ...rolesss } = this.toObject();
    rolesss.uid = _id;
    return rolesss;
}

export default model("Role", RoleSchema)
*/