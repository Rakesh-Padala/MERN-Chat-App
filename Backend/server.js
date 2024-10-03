const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const authRoutes = require("./routes/auth.js")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.mongodb_url,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MONGO-DB connection successfull")
})
.catch(err => console.log(err))

app.use('/api/auth',authRoutes)

app.listen(PORT,() => {
    console.log(`server started at http://localhost:${PORT}`)
})