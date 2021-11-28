// npm install --save neo4j-driver
// node example.js
const nanoid = require("nanoid");
const neo4j = require("neo4j-driver");
require("dotenv").config();
const { url, db_username, db_password, database } = process.env;
console.log(url, db_username, db_password, database);
const driver = neo4j.driver(
  url,
  neo4j.auth.basic(db_username, db_password),
  {}
);

const session = driver.session({ database });

const findAll = async () => {
  const result = await session.run(`Match (u:User) return u`);
  return result;
};

const create = async (user) => {
  const result = await session.run(
    `CREATE (u:User { fname: '${user.fname}',lname: '${user.lname}', email: '${user.email}', password: '${user.password}'} ) return u`
  );
  return result.records;
};

module.exports = {
  create,
  findAll,
};
