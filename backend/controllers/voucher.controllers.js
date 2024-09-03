import Voucher from '../models/voucher.model.js';

// Create a new voucher
export const createVoucher = async (req, res) => {
    const { no, amount, date, address, descOfPayment, bankAcc, checkNum, invoiceNo, classExp, subclass, preparedBy, accounting, approvedBy } = req.body;

    try {
        const voucher = new Voucher({ no, amount, date, address, descOfPayment, bankAcc,checkNum, invoiceNo, classExp, subclass, preparedBy, accounting, approvedBy });
        await voucher.save();
        res.status(201).json(voucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all vouchers
export const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        res.status(200).json(vouchers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a voucher by ID
export const getVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (voucher) {
            res.status(200).json(voucher);
        } else {
            res.status(404).json({ message: 'Voucher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a voucher by ID
export const updateVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (voucher) {
            res.status(200).json(voucher);
        } else {
            res.status(404).json({ message: 'Voucher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a voucher by ID
export const deleteVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndDelete(req.params.id);
        if (voucher) {
            res.status(200).json({ message: 'Voucher deleted' });
        } else {
            res.status(404).json({ message: 'Voucher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchVouchers = async (req, res) => {
    try {
        const query = req.body;

        // Find vouchers matching the query parameters
        const vouchers = await Voucher.find(query);
        return res.json(vouchers);
    } catch (error) {
        console.log("searchVouchers Controller Error", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
