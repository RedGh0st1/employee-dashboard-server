const express = require("express")
const app = express()
const data = require("./data/employeesData.json")
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
const port = process.env.PORT || 8000

app.get("/employee", (request, response) => {
  response.send({ employees: data.employees })
})

app.get("/employee/:id", (request, response) => {
  //   const { id } = req.params.id
  const employeeId = data.employees.find(
    (employee) => employee.id === request.params.id
  )
  if (employeeId) {
    return response.send({ employee: employeeId })
  } else {
    response.status(404).send({ employee: null })
  }
})

app.post("/employee", (request, response) => {
  // will receive data from client
  console.log("POST RECEIVED", req.body)
  //   response.send({ message: "Employee added" })
})

app.listen(port, () => {
  console.log(`Employee Dashboard server running on port: ${port}`)
})
