const {faker} = require("@faker-js/faker")
const pgp = require("pg-promise")()
const db = pgp("postgres://lennienurse:1291@localhost/employee_dashboard")
const {person: p, internet, company, location: loc} = faker

async function seed() {
  for (let i = 0; i < 10; i++) {
    const valueList = [
      p.firstName(),
      p.lastName(),
      loc.city(),
      company.name(),
      internet.email(),
      internet.avatar(),
      "coding",
    ]
    await db.none(
      `INSERT INTO employee (first_name, last_name, city, company, email, pic, skill) VALUES($1, $2, $3, $4, $5, $6, $7)`,
      valueList
    )
  }
  console.log("Seed data inserted successfully!!")
}

seed()
