require("dotenv").config();
const express = require("express")
const app = express()
const userRoutes = require("./routes/user")
const connectToDB = require("./config/db")
var cors = require('cors')

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectToDB()

// routes
app.use("/api",userRoutes)

module.exports = app;