let metricsArr = [
  {
    timestamp: '2015-09-01T16:00:00.000Z',
    temperature: 27.1,
    dewPoint: 16.7,
    precipitation: 0
  },
  {
    timestamp: '2015-09-01T16:10:00.000Z',
    temperature: 27.3,
    dewPoint: 16.9,
    precipitation: 0
  },
];

let testObj = {
    timestamp: '2015-09-01T16:00:00.000Z'
};

// If timestamp is found check where it matches the object and delete
    for (var i = 0; i < metricsArr.length - 1; i++) {
        if (metricsArr[i].timestamp === testObj.timestamp) {
            // If there is a match, delete the object
            metricsArr.splice(i, 1);
        } else {
            continue;
        }
    }

metricsArr
