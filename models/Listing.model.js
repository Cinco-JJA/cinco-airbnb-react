const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const polygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [
            [
                [Number]
            ]
        ],
        required: true
    }
});

/**
 * Schema for an AirBnB listing model.
 * @property {String} price Price in USD/night
 * @property {Number} bathrooms Number of bathrooms
 * @property {Number} bedrooms Number of bedrooms
 * @property {Number} minNights Minimum nights to book
 * @property {String} securityDeposit Price of security deposit in USD
 * @property {String} cleaningFee Price for required cleaning in USD
 * @property {Number} numReviews Number number of reviews
 * @property {Number} reviewRating Rating
 * @property {String} neighborhood Neighborhood the listing is in
 * @property {[[[Number]]]} location Array of array of arrays of numbers for GeoJSON polygon object type. https://mongoosejs.com/docs/geojson.html
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
    },
    neighborhood: {
        type: String
    },
    location: polygonSchema
});

module.exports = listingSchema;