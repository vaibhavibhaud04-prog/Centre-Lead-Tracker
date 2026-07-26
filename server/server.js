const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const { Lead, FollowUp } = require("./models");   
const leadRoutes = require("./routes/leadRoutes");
const followUpRoutes = require("./routes/followUpRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Centre Lead Tracker API Running"
    });
});

sequelize.authenticate()
.then(() => {
    console.log("Database Connected");

    
    return sequelize.sync({ alter: true });
})
.then(() => {
    console.log("Tables Synced");
})
.catch((err) => {
    console.log(err);
});

app.use("/api/leads", leadRoutes);
app.use("/api/followups", followUpRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});