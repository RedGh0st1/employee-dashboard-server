const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const employeeController = require("./employeeController/employeeController")

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
const port = process.env.PORT || 8000

app.use("/employee", employeeController)

app.get("/", (request, response) => {
  response.send("Employee Dashboard Server is running !!!")
})

app.listen(port, () => {
  console.log(`Employee Dashboard server running on port: ${port}`)
})
