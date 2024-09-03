import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    account_type: {
        type: String,
        required: true,
    }
});

export const User = mongoose.model('User', userSchema);