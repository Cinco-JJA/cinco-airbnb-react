const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema for an AirBnB listing model.
 * @property {String} price Price in USD/night
 * @property {Number} bathrooms Number of bathrooms
 * @property {Number} bedrooms Number of bedrooms
 * @property {Number} minNights Minimum nights to book
 * @property {String} securityDeposit Price of security deposit in USD
 * @property {String} cleaningFee Price for required cleaning in USD
 * @property {Number} numReviews Number number of reviews
 * @property {Number} reviewRating rating
 */
const listingSchema = new Schema({
    price: {
        type: String,
        unique: false,
        required: true
    },
    bathrooms: {
        type: Number,
        unique: false,
        required: true
    },
    bedrooms: {
        type: Number,
        unique: false,
        required: true
    },
    minNights: {
        type: Number,
        unique: false,
        required: true
    },
    securityDeposit: {
        type: String,
        unique: false,
        required: true
    },
    cleaningFee: {
        type: String,
        unique: false,
        required: true
    },
    numReviews: {
        type: Number,
        unique: false,
        required: true
    },
    reviewRating: {
        type: Number,
        unique: false,
        required: true
    }
});

module.exports = listingSchema;