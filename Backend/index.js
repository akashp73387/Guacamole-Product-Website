import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import authRoutes from "./Routes/authRoute.js";


dotenv.config();
const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
//Db connection
connectDB();
app.use("/api/auth", authRoutes);

//Default route
app.get("/", (req, res) => {
  res.status(200).send("Hi welcome to API");
});


//listen
app.listen(process.env.PORT, () => {
  console.log("Server is running on the port");
});
