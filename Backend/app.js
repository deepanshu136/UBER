const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/db");
const { urlencoded } = require("express");
const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
connectDB();

app.use("/users", userRoutes);

module.exports = app;
