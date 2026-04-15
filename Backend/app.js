const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const connectDB = require("./db/db");
const { urlencoded } = require("express");
const userRoutes = require("./routes/user.routes");

connectDB();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);

module.exports = app;
