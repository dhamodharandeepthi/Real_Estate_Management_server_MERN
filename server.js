const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
require("dotenv").config();

const app = express();

//database connection
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running on port::${PORT} `);
});
