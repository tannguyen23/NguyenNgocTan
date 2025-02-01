import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resourceRoutes from "./routes/resource.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Định nghĩa routes
app.use("/api/resources", resourceRoutes);

export default app;
