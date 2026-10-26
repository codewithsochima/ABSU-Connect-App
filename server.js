require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    sucess: true,
    message: "Welcome to ABSU Connect API",
  });
});

app.listen(PORT, () => {
  console.log(`ABSU Connect server is running on port ${PORT}`);
});
