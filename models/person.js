// npm install --save neo4j-driver
// node example.js
const nanoid = require("nanoid");
const neo4j = require("neo4j-driver");
require("dotenv").config();
const { url, username, password, database } = process.env;
console.log(url, username, password, database);
const driver = neo4j.driver(url, neo4j.auth.basic(username, password), {});

const session = driver.session({ database });

const findAll = async () => {
  const result = await session.run(`Match (u:User) return u`);
  return result;
};

const create = async (user) => {
  const unique_id = nanoid(8);
  const result = await session.run(
    `CREATE (u:User {_id : '${unique_id}', fname: '${user.fname}',lname: '${user.lname}', email: '${user.email}', password: '${user.password}'} ) return u`
  );
  return result.records[0].properties;
};

module.exports = create;
