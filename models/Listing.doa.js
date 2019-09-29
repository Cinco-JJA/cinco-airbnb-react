var mongoose = require('mongoose');
var listingSchema = require('./Listing.model');

listingSchema.statics = {
    create: function(data, cb) {
        new this(data).save(cb)
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query, cb);
    },

    properties: ['bathrooms', 'bedrooms', 'minNights', 'securityDeposit', 'cleaningFee', 'numReviews', 'reviewRating']
}

var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;