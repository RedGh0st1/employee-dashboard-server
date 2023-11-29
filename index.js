const express = require("express")
const app = express()
const data = require("./data/employeesData.json")
const cors = require("cors")

app.use(cors())
const port = process.env.PORT || 8000

app.get("/employee", (request, response) => {
  response.send({ employees: data.employees })
})

app.listen(port, () => {
  console.log(`Employee Dashboard server running on port: ${port}`)
})
