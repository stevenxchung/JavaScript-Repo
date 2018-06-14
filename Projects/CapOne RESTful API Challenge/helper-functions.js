// Import our "database"
var globalArr = require('./index.js');

// helpers will be an object which will carry all other functions
// it will be accessible to all routes via module.exports
let helpers = {};

// Finds and returns the object containing the date (or string) within the
// timestamp by using the string passed in and comparing that to each
// timestamp for each object in the index.js "database"
helpers.findObj = (dateString) => {
    let stampArr = [];
    // Shorten the name for our "database" declared in index.js
    let db = globalArr.metricsArr;
    // Loop through each object in array
    for (var i = 0; i < db.length; i++) {
        if (db[i].timestamp.includes(dateString)) {
            // If there is a match -> return the object
            stampArr.push(db[i]);
        } else {
            continue;
        }
    }
    // Return array
    return stampArr;
};

// Similiar to findObj but also includes a "key" to grab key (whichever string is in req.query.metrics) elements
// keyElements() is used to help build the requested response (this is done via buildObj() below) in the GET stats route
helpers.keyElements = (dateString, key = null) => {
    let stampArr = [];
    // Shorten the name for our "database" declared in index.js
    let db = globalArr.metricsArr;
    // Loop through each object in array and push to the "database" only if certain criterias are met
    for (var i = 0; i < db.length - 1; i++) {
        if (db[i].timestamp.includes(dateString) && key !== null && db[i][key]) {
            // If there is a match, key is provided, and key exists -> push object into array
            stampArr.push(db[i][key]);
        } else if (db[i].timestamp.includes(dateString) && key === null) {
            // If there is a match, key is not provided -> push object into array
            stampArr.push(db[i]);
        } else {
            continue;
        }
    }
    // Return array
    return stampArr;
};

// Returns the average of min and max
// average() is also another function that will be referenced by buildObj()
// to help build the requested response in the GET stats route
helpers.average = (keyword) => {
    let min = Math.min(...helpers.keyElements('2015-09-01', keyword));
    let max = Math.max(...helpers.keyElements('2015-09-01', keyword));
    let average = (max + min) / 2;
    return average;
};

// Builds and returns an array of objects based on a specified metric
// buildObj() is the main function that uses keyElements() and average() to build
// an array of objects which will be sent in a response to the client via the GET stats route
helpers.buildObj = (keyword) => {
    let dataObj = [
        {
            metric: keyword,
            stat: 'min',
            value: Math.min(...helpers.keyElements('2015-09-01', keyword))
        },
        {
            metric: keyword,
            stat: 'max',
            value: Math.max(...helpers.keyElements('2015-09-01', keyword))
        },
        {
            metric: keyword,
            stat: 'average',
            value: helpers.average(keyword)
        }
    ];
    return dataObj;
};

// Export helpers to be used elsewhere
module.exports = helpers;
