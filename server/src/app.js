import express from 'express';
import cors from "cors"
//imported the auth routes.
import authRoutes from "./routes/v1/auth.routes.js"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/v1/user.routes.js"

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Invoice Manager API Running"
  });
});

//register and login route
app.use("/api/v1/auth", authRoutes);

//user routes
app.use("/api/v1/users",userRoutes)


export default app