import { Schema, mongoose } from "mongoose";

const OptionSchema = new Schema({
    name:{
        type: String,
        required: [true, "The name of the option is required"]
    },
    value:{
        type: Number,
        required: [true, "The value of the option is required"]
    },
    question:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "The question id is required"]
    }
})

export default mongoose.model("Option", OptionSchema)


