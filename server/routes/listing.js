const express = require('express')
const Listing = require('../models/Listing.controller');
const router = express.Router()

router.post('/', Listing.createListing);
router.get('/', Listing.getListings);
router.get('/:id', Listing.getListing);
router.put('/:id', Listing.updateListing);
router.delete('/:id', Listing.removeListing);

module.exports = router