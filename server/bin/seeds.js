const fs = require('fs')
const mongoose = require('mongoose')
const Listing = require('../models/Listing.doa')
const { COLORS } = require('../config/properties')
const connect_db = require('../config/database')


/**
 * This is meant to be run on a data set that you need to shift keys for and that has been written in format:
 * 
 * Object(
 *      Key
 *          entryIndexIdentifier
 *              value
 * )
 * 
 * that should be in format:
 * 
 * Array(
 *      Object(
 *          key: value         
 *      )
 * )
 * 
 * @param {String} file Relative (to the bin directory) or absolute file path to use as input JSON data. Default: './data.json'
 * @param {Object} corrections Input object with new key mappings in format {key: desiredKey}.  Default: can be seen in the function body.
 * @example writeCorrectedJSONFile(undefined, {cleaning_fee: "cleaning"})"
 * @example writeCorrectedJSONFile("otherFile.json", {cleaning_fee: "cleaning", "property_type": "property"})"
 */
async function writeCorrectedJSONFile(file, corrections) {
    if (!corrections) {
        corrections = {
            minimum_nights: "minNights",
            security_deposit: "securityDeposit",
            cleaning_fee: "cleaningFee",
            review_scores_rating: "reviewRating",
            number_of_reviews: "numReviews"
        }
    }
    if (!file) file = './data.json'

    let rawData = fs.readFileSync(file);
    let dataSet = JSON.parse(rawData);
    console.log(COLORS.success(`Loaded data set from file ${file}`))

    let dataKeys = Object.keys(dataSet);
    let dataArrays = dataKeys.map(key => Object.keys(dataSet[key]).map(listingIndex => dataSet[key][listingIndex]))
    let correctedDataSet = []
    console.log(COLORS.important(`Initial data set main keys: \n ${Object.keys(dataSet).join('\n    ')}`))

    for (let i = 0; i < Object.keys(dataSet[dataKeys[0]]).length; i++) {
        let dataEntry = dataKeys.map((dataKey, keyIndex) => [(dataKey in corrections) ? corrections[dataKey] : dataKey, dataArrays[keyIndex][i]])
        correctedDataSet.push(Object.fromEntries(dataEntry.filter(e => e)))
    }

    console.log(COLORS.important(`Corrected data set main keys: ${correctedDataSet}`))
    console.log(COLORS.status(correctedDataSet))

    const outputFile = "dataCorrected.json"
    fs.writeFile(outputFile, JSON.stringify(correctedDataSet), 'utf8', function(err) {
        if (err) {
            console.log(COLORS.error("An error occurred while writing JSON Object to File."));
            return console.log(err);
        }
        console.log(COLORS.success(`JSON file has been saved to ${outputFile}.`));
    });

}


/**
 * Seeds the DB with Listing entries from the given input JSON file.
 * 
 * @param {String} file Relative (to the bin directory) or absolute file path to use as input JSON data.
 * @example seedDB()
 * @example seedDB("otherFile.json")
 */
async function seedDB(file = './dataCorrected.json') {
    let rawData = fs.readFileSync(file);
    let dataSet = JSON.parse(rawData);
    console.log(COLORS.success(`Loaded data set from file ${file}`))

    await connect_db()
    await Listing.collection.insertMany(dataSet, async function(err, results) {
        if (err) {
            console.log(COLORS.error(err));
        } else {
            console.log(COLORS.success("Multiple documents inserted to Collection...closing..."));
            await mongoose.connection.close()
        }
    });
}

module.exports = {
    writeCorrectedJSONFile,
    seedDB
}