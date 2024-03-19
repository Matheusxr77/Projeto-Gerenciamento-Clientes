const { Pool } = require('pg');

//Conexão com o banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dados',
    password: 'suehtamxr77',
    port: 5432,
});

module.exports = pool;