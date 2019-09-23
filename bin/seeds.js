const fs = require('fs')
const Listing = require('../models/Listing')
const mongoose = require('mongoose')

/**
 * This function will connect to the database and return the connection object.  
 * If deploying to prod must have process.env.MONGODB_URI defined!
 * @param {String} dbName The database name you're looking to connect to (defaults to "cinco")
 * @returns {mongoose.Types.Connection} the connection object to the database you are connected to.
 */
function connectToDB(dbName = "cinco") {
    const uri = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`
    mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(db => console.log(`Connected to Mongo! Database name: "${db.connections[0].name}"`))
        .catch(err => console.error('Error connecting to mongo', err))
    mongoose.useCreateIndex = true
    var db = mongoose.connection;
    db.on('connected', () => console.log('Connected to MongoDB database'));
    db.on('disconnected', () => console.log('Disconnected from MongoDB database'));
    db.on('SIGINT', () => {
        db.close(() => {
            console.log('Lost connection to MongoDB database due to process termination');
            process.exit();
        });
    });
    db.collection('cinco').conn.collections.listings.createIndex({ location: "2dsphere" })
    return db
}

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
    console.log(`Loaded data set from file ${file}`)

    let dataKeys = Object.keys(dataSet);
    let dataArrays = dataKeys.map(key => Object.keys(dataSet[key]).map(listingIndex => dataSet[key][listingIndex]))
    let correctedDataSet = []
    console.log(`Initial data set main keys: \n ${Object.keys(dataSet).join('\n    ')}`)

    for (let i = 0; i < Object.keys(dataSet[dataKeys[0]]).length; i++) {
        let dataEntry = dataKeys.map((dataKey, keyIndex) => [(dataKey in corrections) ? corrections[dataKey] : dataKey, dataArrays[keyIndex][i]])
        correctedDataSet.push(Object.fromEntries(dataEntry.filter(e => e)))
    }

    console.log(`Corrected data set main keys: ${correctedDataSet}`)
    console.log(correctedDataSet)

    const outputFile = "dataCorrected.json"
    fs.writeFile(outputFile, JSON.stringify(correctedDataSet), 'utf8', function(err) {
        if (err) {
            console.log("An error occurred while writing JSON Object to File.");
            return console.log(err);
        }
        console.log(`JSON file has been saved to ${outputFile}.`);
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
    console.log(`Loaded data set from file ${file}`)
    await connectToDB()
    await Listing.collection.insertMany(dataSet, async function(err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log("Multiple documents inserted to Collection...closing...");
            await mongoose.connection.close()
        }
    });
}

module.exports = {
    writeCorrectedJSONFile,
    connectToDB,
    seedDB
}