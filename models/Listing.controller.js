var Listing = require('./Listing.doa');

exports.createListing = function(req, res, next) {
    var listingData = {
        name: req.body.name,
        description: req.body.description
    }

    Listing.create(listingData, function(err, listing) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "Listing created successfully",
            listing
        })
    })
}

exports.getListings = function(req, res, next) {
    Listing.get({}, function(err, listings) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({ listings })
    })
}

exports.getListing = function(req, res, next) {
    Listing.getById(req.params.id, function(err, listings) {
        if (err) {
            res.json({ error: err })
        }
        res.json({ listings })
    })
}

exports.updateListing = function(req, res, next) {
    listingData = {}
    Listing.properties.forEach(k => listingData[k] = req.body[k])

    Listing.update({ _id: req.params.id }, listingData, function(err, listing) {
        if (err) {
            res.json({ error: err })
        }
        res.json({
            message: "Listing updated successfully",
            listing
        })
    })
}

exports.removeListing = function(req, res, next) {
    Listing.delete({ _id: req.params.id }, function(err, listing) {
        if (err) {
            res.json({ error: err })
        }
        res.json({
            message: "Listing deleted successfully",
            listing
        })
    })
}