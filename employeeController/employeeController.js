const express = require("express");
// const data = require("./data/employeesData.json")
const pgp = require("pg-promise")();
const db = pgp("postgres://lennienurse:1291@localhost/employee_dashboard");
const router = express.Router();
//db.any
//db.many

//db.manyOrNone

//result
router.get("/", (request, response) => {
  db.result("SELECT * FROM employee").then((data) => {
    response.send({ employee: data.rows });
  });
});

//db.OneOrNone
// its not reading request.params.id as a number error: invalid input syntax for type integer: ":id"
router.get("/:id", (request, response) => {
  db.oneOrNone("SELECT * FROM employee WHERE id=$1", [+request.params.id]).then(
    (data) => {
      if (data) {
        response.send({ employee: data });
      } else {
        response.status(404).send({ message: "Employee not found" });
      }
    }
  );
});

//db.Many Or None
router.post("/", (request, response) => {
  const { first_name, last_name, city, company, email, pic, skill } =
    request.body;
  const value = [first_name, last_name, city, company, email, pic, skill];
  const query =
    "INSERT INTO employee (first_name, last_name, city, company, email, pic, skill) VALUES($1, $2, $3, $4, $5, $6, $7)";
  db.none(query, value).then(() => {
    return response.send({ message: "Employee created successfully" });
  });
});

router.put("/:id", (request, response) => {
  const { first_name, last_name, city, company, email, pic, skill } =
    request.body;
  const value = [
    first_name,
    last_name,
    city,
    company,
    email,
    pic,
    skill,
    request.params.id,
  ];
  const query =
    "UPDATE employee SET first_name = $1 , last_name = $2, city = $3, company = $4, email = $5 , pic = $6 , skill = $7 WHERE id = $8";
  db.none(query, value).then(() => {
    return response.send({ message: "Employee updated successfully" });
  });
});

//none
router.delete("/:id", (request, response) => {
  const query = ("DELETE FROM employee WHERE id = $1", [+request.params.id]);
  db.none(query).then(() => {
    return response.send({ message: "Employee deleted successfully" });
  });
});

module.exports = router;
