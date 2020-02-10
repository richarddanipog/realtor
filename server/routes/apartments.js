const express = require('express');
const router = express.Router();
const { getAll, byId, addApartment, deleteCurrentApartment, editApartment } = require('../db/api/apartments');
const { getNewApartmentId, insertImages, deleteApartmentImageById, updateApartmentImages } = require('../db/api/imagesApartment')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/apartment')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
})
const upload = multer({ storage });

/* GET apartments listing. */
router.get('/', function (req, res, next) {
    getAll(req.query)
        .then(apartments => res.status(200).json({ apartments }))
        .catch(error => res.status(500).json({ error: error.message }))
});

router.get('/:id', function (req, res, next) {
    res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    byId(req.params.id)
        .then(apartment => res.status(200).json(apartment))
        .catch(error => res.status(500).json({ error: error.message }))
});


router.post('/', upload.array('images'), async (req, res, next) => {
    const main_image = req.files[0].originalname;
    const { user_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, status } = req.body;
    await addApartment({ user_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status })
    const apartmentId = await getNewApartmentId()
    for (let img of req.files.slice(1)) {
        await insertImages(apartmentId[0].id, img.originalname)
    }
})

router.delete('/', async (req, res) => {
    const deletedAllImages = await deleteApartmentImageById(req.query)
    const approved = await deleteCurrentApartment(req.query)
    res.status(200).send("Delete")
})

router.put("/", upload.array('images'), async (req, res) => {
    await deleteApartmentImageById({id:req.body.apartment_id})
    for (let img of req.files.slice(1)) {
        insertImages(req.body.apartment_id, img.originalname)
    }
    const main_image = req.files[0].originalname;
    const { apartment_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, status } = req.body;
    const approved = await editApartment({ apartment_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, status, main_image });
    res.status(200).send("edit")
})

module.exports = router;