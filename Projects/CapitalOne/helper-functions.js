// Import our "database"
var globalArr = require('./index.js');

let helpers = {};

// Finds the object containing the date within the timestamp
helpers.findObj = (dateString) => {
    let stampArr = [];
    // Loop through each object in array
    for (var i = 0; i < globalArr.metricsArr.length - 1; i++) {
        if (globalArr.metricsArr[i].timestamp.includes(dateString)) {
            // If there is a match, return the object
            stampArr.push(globalArr.metricsArr[i]);
        } else {
            continue;
        }
    }
    // Return array
    return stampArr;
};

// Loops through entire array and grabs key elements
helpers.keyElements = (dateString, key = null) => {
    let stampArr = [];
    // Loop through each object in array
    for (var i = 0; i < globalArr.metricsArr.length - 1; i++) {
        if (globalArr.metricsArr[i].timestamp.includes(dateString) && key !== null && globalArr.metricsArr[i][key]) {
            // If there is a match, key is provided, and key exists -> push object into array
            stampArr.push(globalArr.metricsArr[i][key]);
        } else if (globalArr.metricsArr[i].timestamp.includes(dateString) && key === null) {
            // If there is a match, key is not provided -> push object into array
            stampArr.push(globalArr.metricsArr[i]);
        } else {
            continue;
        }
    }
    // Return array
    return stampArr;
};

// Returns the average of min and max
helpers.average = (keyword) => {
    let min = Math.min(...helpers.keyElements('2015-09-01', keyword));
    let max = Math.max(...helpers.keyElements('2015-09-01', keyword));
    let average = (max + min) / 2;
    return average;
};

// Builds and returns a data object based on a specified metric
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

module.exports = helpers;
