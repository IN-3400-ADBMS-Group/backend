// npm install --save neo4j-driver
// node example.js
var { nanoid } = require("nanoid");
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
  return result.records.map((i) => i.get("u").properties);
};

const create = async (user) => {
  var unique_id = nanoid(8);
  const result = await session.run(
    `CREATE (u:User { _id : '${unique_id}',fname: '${user.fname}',lname: '${user.lname}', email: '${user.email}', password: '${user.password}'} ) return u`
  );
  return await findById(unique_id);
};

const findById = async (id) => {
  const result = await session.run(
    `MATCH (u:User {_id : '${id}'} )return u limit 1`
  );
  return result.records[0].get("u").properties;
};

const deleted = async (id) =>{
    await session.run(`MATCH (u:User {_id : '${id}'}) DELETE u`)
    return await findAll()
};


const update = async (id, user) => {
  const result = await session.run(
    `MATCH (u:User {_id : '${id}'}) SET u.name= '${user.name}', u.email= '${user.email}', u.password= '${user.password}' return u`
  );
  return await findById(id);
};
module.exports = {
  create,
  findAll,
  findById,
  update,
  deleted
};
