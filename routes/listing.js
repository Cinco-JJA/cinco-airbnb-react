const express = require('express')
const Listing = require('../models/Listing')
const router = express.Router()


/** 
 * Get all listings within a specific distance.
 * TODO: Change this to a post so we can input a distance.
 * @example
 * GET /api/listings
 * */
// Route to get all listings
router.get('/', (req, res, next) => {
    Listing.find()
        .then(listings => {
            res.json(listings)
        })
        .catch(err => next(err))
})

/** 
 * Create a new listing
 * TODO: Change this to a post so we can input a distance.
 * @example
 * POST /api/listings
 * */
router.post('/', (req, res, next) => {
    let { price, bathrooms, bedrooms, minNights, securityDeposit, cleaningFee, reviewRatings } = req.body
    let listingData = { price, bathrooms, bedrooms, minNights, securityDeposit, cleaningFee, reviewRatings }
    Listing.create(listingData)
        .then(listing => {
            res.json({
                success: true,
                listing,
            })
        })
        .catch(err => next(err))
})


/** 
 * Get all listings within a specific distance.
 * TODO: Change this to a post so we can input a distance.
 * @example
 * GET /api/listings/search?lat=20&lon=-60
 * GET /api/listings/search?lat=20&lon=-60&maxDist=100
 * */
// Route to get all listings
router.get('/search', (req, res, next) => {
    const lat = req.query.lat || 25.766167
    const lon = req.query.lon || -80.196176
    const maxDist = req.query.maxDist || 32186.9 // 20 miles

    console.log(`Searching for listings near ${lat}, ${lon} within ${maxDist} meters`)
    Listing.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    $maxDistance: maxDist
                }
            }
        })
        .then(listings => {
            res.json(listings)
        })
        .catch(err => next(err))
})
module.exports = router