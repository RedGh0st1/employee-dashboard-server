const express = require("express")
const router = express.Router()

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

module.exports = router
