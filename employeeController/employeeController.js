const express = require("express")
// const data = require("./data/employeesData.json")
const pgp = require("pg-promise")()
const db = pgp("postgres://lennienurse:1291@localhost/employee_dashboard")
const router = express.Router()
//db.any
//db.many
//db.OneOrNone
//db.manyOrNone

router.get("/employee", (request, response) => {
  response.send({ employees: data.employees })
})

router.get("/employee/:id", (request, response) => {
  const employeeId = data.employees.find(
    (employee) => employee.id === request.params.id
  )
  if (employeeId) {
    return response.send({ employee: employeeId })
  } else {
    response.status(404).send({ employee: null })
  }
})

router.post("/employee", (request, response) => {
  // will receive data from client
  console.log("POST RECEIVED", req.body)
  //   response.send({ message: "Employee added" })
})

router.put("/employee/:id", (request, response) => {
  console.log("PUT RECEIVED")
})

router.get("/", (request, response) => {
  response.status(200).json("Server is running !!!")
})

module.exports = router
