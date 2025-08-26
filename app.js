const express = require("express");
const mongoose = require("mongoose");
const CookieParser = require("cookie-parser");
const authRoute = require("./routers/route");
const authenticate = require("./middleware/authenticate");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(CookieParser());

app.use(authRoute);

mongoose.connect(process.env.URI)
    .then(() => {
        console.log("Connected to database");
        app.listen(8080, () => {
            console.log("Running on Port 8080");
        });
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
        process.exit(1);
    });
