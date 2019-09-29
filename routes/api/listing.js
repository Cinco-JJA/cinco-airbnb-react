const express = require('express')
const Listing = require('../../models/Listing.controller');
const router = express.Router()

router.post('/create', Listing.createListing);
router.get('/get', Listing.getListings);
router.get('/get/:name', Listing.getListing);
router.put('/update/:id', Listing.updateListing);
router.delete('/remove/:id', Listing.removeListing);

module.exports = router