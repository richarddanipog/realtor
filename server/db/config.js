const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Rr9550268!',
//     database: 'realtor'
// });
const connection = mysql.createConnection({
    host: 'l6slz5o3eduzatkw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'cyskir9b10ru5sto',
    password: 'nenb3le88kgl6ner',
    database: 'b4hgq84ack2bsl4k'
});

module.exports = connection;