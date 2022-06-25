const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"us-cdbr-east-05.cleardb.net",
    user: 'bb0e141fd659ab',
    password: 'af5c1df1',
    dbname: 'heroku_3a0accdf1ff0ee1'
})
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});