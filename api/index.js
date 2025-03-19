const express = require('express')
const mysql = require('mysql')

const app = express()
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE
})

app.use(express.json())

const port = process.env.API_PORT || 4000

app.listen(port, () => {
    console.log("API escutando a porta " + port)
})

app.get("/guides", (request, response) => {

})

app.post("/guides", (request, response) => {

})

app.delete("/guides", (request, response) => {

})

app.put("/guides", (request, response) => {

})