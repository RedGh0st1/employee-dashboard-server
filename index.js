const express = require("express")
const app = express()
const data = require("./data/employeesData.json")
const cors = require("cors")
const bodyParser = require("body-parser")
const employeeController = require("./employeeController/employeeController")
const pgp = require("pg-promise")()
const db = pgp("postgres://lennienurse:1291@localhost/employee_dashboard")
console.log(db)
db.query("CREATE TABLE IF NOT EXISTS Grades();")

//db.any
//db.many
//db.OneOrNone
//db.manyOrNone

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
const port = process.env.PORT || 8000

app.use("/employee", employeeController)

app.get("/employee/:id", (request, response) => {
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

app.put("/employee/:id", (request, response) => {
  console.log("PUT RECEIVED")
})

app.get("/", (request, response) => {
  response.status(200).json({ data: "Server is running !!!" })
})

app.listen(port, () => {
  console.log(`Employee Dashboard server running on port: ${port}`)
})
