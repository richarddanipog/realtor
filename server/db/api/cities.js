const connection = require('../config');


function byId(cityId) {
    console.log(cityId);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT C.*,CO.name "country_name" FROM cities C join apartments A on A.city_id = C.id join countries CO on C.country_id = CO.id where A.city_id = ?`, [cityId], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}


function getCities() {

    return new Promise((resolve, reject) => {
        connection.query(`SELECT cities.* FROM countries join cities on countries.id = cities.country_id group by countries.name;`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}


module.exports = {
    byId,
    getCities
}