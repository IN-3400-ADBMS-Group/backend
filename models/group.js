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
  const result = await session.run(`Match (g:Group) return g`);
  console.log(result);
  return result.records.map((i) => i.get("g").properties);
};

const create = async (group) => {
  var unique_id = nanoid(8);
  const result = await session.run(
    `CREATE (g:Group { _id : '${unique_id}',name: '${group.name}',description: '${group.description}' } ) return g`
  );
  return await findById(unique_id);
};

const findById = async (id) => {
  const result = await session.run(
    `MATCH (g:Group {_id : '${id}'} )return g limit 1`
  );
  return result.records[0].get("g").properties;
};

const createRelation = async (res) => {
  const result = await session.run(
    `MATCH
  (u:User),
  (g:Group)
WHERE u.fname = '${res.user}' AND g.name = '${res.group}'
CREATE (u)-[r:Follows]->(g)
RETURN type(r)`
  );
  return result;
};
const follow = async (user) => {
  const result = await session.run(
    `MATCH (u:User {fname: '${res.fname}'})-->(Group) RETURN Group.name`
  );
  return result;
};
const deletedRelation = async (user) => {
  await session.run(`MATCH (n {fname: '${user.fname}'})-[r:Follows]->()
DELETE r`);
  return await findAll();
};

module.exports = {
  create,
  findAll,
  findById,
  createRelation,
  follow,
  deletedRelation,
};
