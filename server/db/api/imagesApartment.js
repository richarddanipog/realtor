const connection = require('../config');
const Builder = require('./builder')

function getNewApartmentId(){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT MAX(id) as id FROM apartments;`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    })
}



function insertImages(byId,url){
    const newUrl = "/images/apartment/"+url
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO images (apartment_id, url) VALUES (${byId}, "${newUrl}")`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    })
}

function deleteApartmentImageById({id}){
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM images WHERE apartment_id IN (${id})`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    })
}


function updateApartmentImages(byId,url){
    const newUrl = "/images/apartment/"+url
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE images SET url = ${newUrl} WHERE id =${byId})`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    })
}

module.exports={
    insertImages,
    getNewApartmentId,
    deleteApartmentImageById,
    updateApartmentImages
}