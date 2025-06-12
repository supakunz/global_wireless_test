require("dotenv").config();

const express = require("express");
const usersRouter = require("./routes/users");
const connectDB = require("./utils/db");
var cors = require("cors");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Middleware เพื่อแปลงข้อมูลฟอร์ม
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
