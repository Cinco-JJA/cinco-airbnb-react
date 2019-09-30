const express = require('express');
const axios = require('axios')
const router = express.Router();

/** 
 * GET home page  
 */
router.get('/listings', async(req, res, next) => {
    try {
        // await axios.get('/api/listings/get')
        res.render('listings', {
            listings: [{
                price: '$5.00',
                propertyType: "Apartment",
                neighborhood: "Somewhere...",
                title: "This is a cute little place",
                total: "$10.00",
                rating: 4.7,
                numRatings: 639,
                image: 'https://press.airbnb.com/wp-content/uploads/sites/4/2019/09/Barcelona_14088603_Pool_2_JSL1.jpg?fit=2096,1048'
            },{
                price: '$15.00',
                propertyType: "Apartment",
                neighborhood: "Somewhere...",
                title: "This is a cute little place",
                total: "$10.00",
                rating: 4.5,
                numRatings: 20,
                image: 'https://press.airbnb.com/wp-content/uploads/sites/4/2019/09/Sydney_14935456_Kitchen_1_JSL1.jpg?fit=2096,1048'
            },{
                price: '$54.00',
                propertyType: "Apartment",
                neighborhood: "Somewhere...",
                title: "This is a cute little place",
                total: "$10.00",
                rating: 4.1,
                numRatings: 263,
                image: 'https://press.airbnb.com/wp-content/uploads/sites/4/2019/09/Rome_10700775_LivingRoom_3_JSL1.jpg?fit=2096,1048'
            },{
                price: '$80.00',
                propertyType: "Apartment",
                neighborhood: "Somewhere...",
                title: "This is a cute little place",
                total: "$15.00",
                rating: 4.1,
                numRatings: 263,
                image: 'https://press.airbnb.com/wp-content/uploads/sites/4/2019/09/Nashville_29518280_LivingRoom_2_JSL1.jpg?fit=2096,1048'
            }]
        });
    } catch (err) {
        req.flash({ error: err })
        next(err)
    }
});

module.exports = router;