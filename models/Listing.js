const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    price: String,
    bathrooms: Number,
    bedrooms: Number,
    minNights: Number,
    securityDeposit: String,
    cleaningFee: String,
    numReviews: Number,
    reviewRating: Number
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;