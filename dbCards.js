import mongoose from 'mongoose';

const { Schema } = mongoose;

const personSchema = new Schema({
    id: Number,
    name: String,
});

export default mongoose.model('Card', personSchema);