import express from "express";
import { getStocks, postStock } from "../controllers/stock.controller.js";

const router = express.Router();

router.get("/getStock", getStocks);
router.get("postStock", postStock);

export default router;

