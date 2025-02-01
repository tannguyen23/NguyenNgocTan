import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resourceRoutes from "./routes/resource.routes";

dotenv.config(); // ✅ Load biến môi trường từ .env

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Định nghĩa route API đúng
app.use("/api/resources", resourceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
