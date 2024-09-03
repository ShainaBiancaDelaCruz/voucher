import express from "express";
import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import stockRoute from "./routes/stock.route.js";
import authRoute from "./routes/auth.route.js";
import voucherRoute from "./routes/voucher.routes.js";
import expenditureRoute from "./routes/expenditure.routes.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());

app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/stock/", stockRoute);
app.use("/api/v1/voucher/", voucherRoute);
app.use("/api/v1/expenditure/", expenditureRoute);

app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting server:', error);
    } else {
        console.log('Server is running at http://localhost:' + PORT);
        connectDB();
    }
});
