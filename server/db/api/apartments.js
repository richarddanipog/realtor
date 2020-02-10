const connection = require('../config');
const Builder = require('./builder')


function getAll({ id, user_id,country_id, city_id, number_of_room, price, maxPrice, minPrice, number_of_bath, sale_status, page = 1, size = 12 }) {
    const builder = new Builder();
    return new Promise((resolve, reject) => {
        const { query, params } = builder.allApartments(page, size)
            .id(id)
            .user_id(user_id)
            .city_id(city_id)
            .price(price)
            .number_of_room(number_of_room)
            .number_of_bath(number_of_bath)
            .sale_status(sale_status)
            .minimum_price(minPrice)
            .maximum_price(maxPrice)
            .country(country_id)
            .build()
        connection.query(query, [...params, page, size], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function byId(apartmentId) {
    return new Promise((resolve, reject) => {
        connection.query(`Select A.*, group_concat(I.url) images ,C.name city,CO.name country
        from apartments A join images I on A.id = I.apartment_id 
        join cities C on A.city_id = C.id
        join countries CO on CO.id = C.country_id
        where A.id = ?`, [apartmentId], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function addApartment({ user_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status }) {
    main_image = "images/apartment/" + main_image;
    return new Promise((resolve, reject) => {
        connection.query(`CALL add_apartment(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [user_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(results.insertId);
        });
    })
}

function getNewestApartments() {
    return new Promise((resolve, reject) => {
        connection.query("CALL getApartmentsByCreateTime()", (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    })
}

function deleteCurrentApartment({id}){
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM apartments WHERE id = ?`,[id] ,(error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    })
}

function editApartment({ apartment_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status }) {
    main_image = "images/apartment/" + main_image;
    console.log(apartment_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status)
    return new Promise((resolve, reject) => {
        connection.query(`CALL edit_apartment(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [apartment_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results.insertId);
        });
    })
}

module.exports = {
    getAll,
    byId,
    addApartment,
    getNewestApartments,
    deleteCurrentApartment,
    editApartment
}