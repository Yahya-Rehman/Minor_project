var mysql = require('mysql')
var pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'codesenddb',
        connectionLimit: 100,
        multipleStatements: true
    });

module.exports = pool;


