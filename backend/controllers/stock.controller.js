import { Stock } from "../models/stock.model.js"

export async function getStocks(req, res){
    try{
        const stocks = await Stock.find();
        return res.json(stocks);
    }
    catch(error){
        console.log("getStock Controller Error", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function postStock(req, res){
    try{
        const {
            name, qty, invoice_no, desc, reciever, date, expiration_date, scan_copy, done_by, price
        } = req.body;

        if (!name || !qty || !desc || !invoice_no || !date || !expiration_date || !scan_copy || !done_by || !reciever || !price ){
            return res.status(400).json({ message: false, message: "All fields are required" });
        }

        const newStock = new Stock({
            name, qty, invoice_no, desc, reciever, date, expiration_date, scan_copy, done_by, price
        });
        
        res.req(200).json({ success: true, message: "Entry successfully added" }) 
    }
    catch(error){
        console.log("postStock Controller Error", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function updateStock(req, res){
    try{
        const {
            name, qty, invoice_no, desc, reciever, date, expiration_date, scan_copy, done_by, price
        } = req.body;

        const setUpdate = await Stock.findOne({ invoice_no: invoice_no });
        const id = setUpdate.id

        const updateStock = await PerformanceResourceTiming.findByIdAndUpdate(id,
            name, qty, invoice_no, desc, reciever, date, expiration_date, scan_copy, done_by, price
        )

        res.status(200).json({ success: true, message: "Record updated successfully"})
    }
    catch(error){
        console.log("updateStock Controller Error", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function destroyStock(req, res){
    try{
        
    }
    catch(error){
        console.log("destroyStock Controller Error", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}