// db.js

let c = {
    host: 'localhost',
    port: 5434,
    user: 'postgres',
    password: 'admin',
    database: 'postgres',
};

const Pool = require('pg').Pool
const connection_string = { connectionString: `postgresql://${c.user}:${c.password}@${c.host}:${c.port}/${c.database}` };
const pool = new Pool(connection_string);


module.exports = pool;