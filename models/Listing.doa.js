var mongoose = require('mongoose');
var listingSchema = require('./Listing.model');

listingSchema.statics = {
    create: function(data, cb) {
        new this(data).save(cb)
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getById: function(query, cb) {
        this.findById(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query, cb);
    },

    properties: ["price", "bathrooms", "bedrooms", "minNights", "securityDeposit", "cleaningFee", "numReviews", "reviewRating"]
}

var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;