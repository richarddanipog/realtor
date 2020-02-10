const connection = require('../config');

function addUser({role_id=2, first_name, last_name, email,password,phone,status='active'}) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO users (role_id, first_name, last_name, email,password,phone,status)
        VALUES (?,?,?,?,?,?,?);`, 
        [role_id, first_name, last_name, email,password,phone,status],
        
        (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    })
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        connection.query(`Select * from users WHERE password = ? and  email = ?`,[password,email] ,(error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results[0]);
        });
    });
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
        connection.query(`Select * from users`,(error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}
module.exports = {
    login,
    addUser,
    getAllUsers
}