require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/database");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    sucess: true,
    message: "Welcome to ABSU Connect API",
  });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`ABSU Connect server is running on port ${PORT}`);
  });
};

startServer();