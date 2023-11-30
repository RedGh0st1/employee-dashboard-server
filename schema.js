console.log("Running schema file....")
const pgp = require("pg-promise")()
const { exit } = require("node:process")
const db = pgp("postgres://lennienurse:1291@localhost/employee_dashboard")
;(async function () {
  await db.query("DROP TABLE IF EXISTS grades")
  await db.query("DROP TABLE IF EXISTS employee")

  await db.query(`
      CREATE TABLE employee(
        id SERIAL PRIMARY KEY,
        first_name varchar(255),
        last_name varchar(255),
        city varchar(255),
        company varchar(255),
        email varchar(255),
        pic text,
        skill varchar(255)
      );
    `)

  await db.query(`
    CREATE TABLE grades(
        id SERIAL PRIMARY KEY,
        score INTEGER DEFAULT 0,
        employee_id integer REFERENCES employee(id) ON DELETE CASCADE
    );
    `)
  await db.query(`CREATE INDEX grades_employee_id ON grades(employee_id);`)
  console.log("Schema file ran successfully")
  exit(0)
})()
