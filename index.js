const express = require("express")
const app = express()
const path = require("path")
const templatepath = path.join(__dirname + "/template/views")
const port = process.env.PORT || 8000
const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
require("dotenv").config()
// view engine
app.set("view engine", "hbs")
app.set("views", templatepath)

app.use("/",require('./routes/router'))

app.listen(port,()=>{
    console.log(`sever has started at port ${port}`)
})