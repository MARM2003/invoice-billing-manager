import express from 'express';
//imported the auth routes.
import authRoutes from "./routes/v1/auth.routes.js"

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Invoice Manager API Running"
  });
});

//register and login route
app.use("/api/v1/auth", authRoutes);


export default app