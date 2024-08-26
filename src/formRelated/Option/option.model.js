import {Schema, model} from "mongoose"

const OptionSchema = new Schema({
    text: String,
    value: Number
});

/*
OptionSchema.methods.toJSON = function () {
    const { __v, ...option } = this.toObject();
    option.uid = _id;
    return option;
}
*/

export default OptionSchema