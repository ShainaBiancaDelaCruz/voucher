import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema({
    no: {
        type: Number,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    descOfPayment: {
        type: String,
        required: true,
    },
    bankAcc: {
        type: String,
        required: true,
    },
    checkNum: {
        type: Number,
        required: true,
    },
    invoiceNo: {
        type: Number,
        required: true,
    },
    classExp: {
        type: Number,
        required: true,
    },
    subclass: {
        type: String,
    
    },
    preparedBy: {
        type: String,
        required: true,
    },
    accounting: {
        type: String,
        required: true,
    },
    approvedBy: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;
