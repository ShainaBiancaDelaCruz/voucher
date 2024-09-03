import mongoose from "mongoose";

const stockSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    invoice_no: {
        type: Number,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    reciever: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    expiration_date: {
        type: Number,
        required: true
    },
    scan_copy: {
        type: String,
        required: true
    },
    done_by: {
        type: String,
        required: true
    },
    rt_status: {
        type: Boolean,
    }
});

export const Stock = mongoose.model('Stock', stockSchema);