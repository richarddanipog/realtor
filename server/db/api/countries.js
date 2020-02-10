const connection = require('../config');


function getCounties() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT CO.* FROM cities C JOIN countries CO on C.country_id = CO.id group by CO.name`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}


module.exports = {
    getCounties
}