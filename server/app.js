require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

const dns = require("dns");

const courseRoute = require("./routes/courseRoutes");
const authRoute = require("./routes/authRoutes");

app.use(express.json());

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use("/api/course", courseRoute);
app.use("/api/auth", authRoute);

connectDB();

app.listen(3000, () => {
    console.log("Listening to port.....");
});