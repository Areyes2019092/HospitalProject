import mongoose from 'mongoose';
import OptionSchema from './Option/option.model.js';

const ResponseSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedOption: OptionSchema
});

export default ResponseSchema;
