const express = require("express")
const mongoose = require("mongoose")
const mongodb = require("mongodb")
const CookieParser = require("cookie-parser")
const authRoute = require("./routers/route")


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(CookieParser())

require("dotenv").config()
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("connecting to database")
        app.listen(8080, () => {
            console.log("running on Port 8080")
        })
    })
    .catch((error) => {
        console.log(error)
    })
app.use(authRoute);