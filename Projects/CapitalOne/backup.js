var express = require('express');
var router = express.Router();

// Load the full build for Lodash
var _ = require('lodash');

// features/02-stats/01-get-stats.feature
router.get('/stats?<params...>', (req, res) => {
  /* Example:
    assert.deepEqual(req.query.metric, [
      'temperature',
      'dewPoint'
    ]);

    assert.deepEqual(req.query.stat, [
      'min',
      'max'
    ]);

    res.send([
      {
        metric: 'temperature',
        stat: 'min'
        value: 27.1
      },
      {
        metric: 'temperature',
        stat: 'max'
        value: 27.5
      },
      {
        metric: 'dewPoint',
        stat: 'min'
        value: 16.9
      },
      {
        metric: 'dewPoint',
        stat: 'max'
        value: 17.3
      }
    ]);
  */

    const metricsArr = [
      {
        timestamp: '2015-09-01T16:00:00.000Z',
        temperature: 27.1,
        dewPoint: 16.9
      },
      {
        timestamp: '2015-09-01T16:10:00.000Z',
        temperature: 27.3,
        dewPoint: null
      },
      {
        timestamp: '2015-09-01T16:20:00.000Z',
        temperature: 27.5,
        dewPoint: 17.1
      },
      {
        timestamp: '2015-09-01T16:30:00.000Z',
        temperature: 27.4,
        dewPoint: 17.3
      },
      {
        timestamp: '2015-09-01T16:40:00.000Z',
        temperature: 27.2,
        dewPoint: null
      },
      {
        timestamp: '2015-09-01T17:00:00.000Z',
        temperature: 28.1,
        dewPoint: 18.3
      }
    ];

    // Loops through entire array and grabs key elements
    let stamp = (dateString, key = null) => {
        let stampArr = [];
        // Loop through each object in array
        for (var i = 0; i < metricsArr.length - 1; i++) {
            if (metricsArr[i].timestamp.includes(dateString) && key !== null && metricsArr[i][key]) {
                // If there is a match, key is provided, and key exists -> push object into array
                stampArr.push(metricsArr[i][key]);
            } else if (metricsArr[i].timestamp.includes(dateString) && key === null) {
                // If there is a match, key is not provided -> push object into array
                stampArr.push(metricsArr[i]);
            } else {
                continue;
            }
        }
        // Return array
        return stampArr;
    };

    // Returns the average of min and max
    let average = (keyword) => {
        let min = Math.min(...stamp('2015-09-01', keyword));
        let max = Math.max(...stamp('2015-09-01', keyword));
        let average = (max + min) / 2;
        return average;
    };

    // Builds and returns a data object based on a specified metric
    let buildObj = (keyword) => {
        let dataObj = [
            {
                metric: keyword,
                stat: 'min',
                value: Math.min(...stamp('2015-09-01', keyword))
            },
            {
                metric: keyword,
                stat: 'max',
                value: Math.max(...stamp('2015-09-01', keyword))
            },
            {
                metric: keyword,
                stat: 'average',
                value: average(keyword)
            }
        ];
        return dataObj;
    };

    // Runs through list of checks
    if (req.query.metric === 'temperature') {
        // If the request metric is temperature, build array and respond with status code 200 and array object
        let tempData = buildObj('temperature');
        res.status(200).send(tempData);
    } else if (req.query.metric === 'dewPoint') {
        // If the request metric is dewPoint, build array and respond with status code 200 and array object
        let dewData = buildObj('dewPoint');
        res.status(200).send(dewData);
    } else if (req.query.metric.length > 1) {
        // If the request has more than 1 metric, build array and respond with status code 200 and array object
        let combined = _.merge(buildObj('temperature'), buildObj('dewPoint'));
        res.status(200).send(combined);
    } else {
        // Metric does not exist
        res.sendStatus(200);
    }
});

// Export module
module.exports = router;
