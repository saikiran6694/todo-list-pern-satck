import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "saikiran",
  password: "",
  host: "localhost",
  port: "5432",
  database: "todopern",
});

console.log("Connected to DB");

export default pool;
