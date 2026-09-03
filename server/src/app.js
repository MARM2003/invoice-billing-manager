import express from 'express';
import cors from "cors"
import cookieParser from "cookie-parser";
import errorHandler from './middleware/error.middleware.js';
//imported the auth routes.
import authRoutes from "./routes/v1/auth.routes.js"
//imported the userRoutes
import userRoutes from "./routes/v1/user.routes.js"
//imported the customers route
import customerRoutes from "./routes/v1/customer.routes.js"
import invoiceRouter from "./routes/v1/invoice.routes.js"
import dashboardRoutes from "./routes/v1/dashboard.routes.js"
import paymentRoutes from "./routes/v1/payment.routes.js";
import stipeInvoiceRoute from "./routes/v1/stripe.routes.js"

//creating the app
const app = express();

//cors config
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(
  "/api/v1/stripe-payment",
  express.raw({ type: "application/json" })
);
//incoming json parse
app.use(express.json());
//cookie-parser
app.use(cookieParser());
//base API to check backend
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Invoice Manager API Running"
  });
});

//register and login route
app.use("/api/v1/auth", authRoutes);

//user routes
app.use("/api/v1/users", userRoutes)

//customers routes
app.use("/api/v1/customers", customerRoutes)

//invoice routes
app.use("/api/v1/invoices", invoiceRouter)

//dashboard summary
app.use("/api/v1/dashboardSummary", dashboardRoutes)

//payments
app.use("/api/v1/payments", paymentRoutes);

//stipe invoice payment 
app.use("/api/v1/stripe-payment", stipeInvoiceRoute)

// Global error handler
app.use(errorHandler);

export default app