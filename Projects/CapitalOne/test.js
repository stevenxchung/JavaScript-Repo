// TESTING DELETE FEATURE
// let metricsArr = [
//   {
//     timestamp: '2015-09-01T16:00:00.000Z',
//     temperature: 27.1,
//     dewPoint: 16.7,
//     precipitation: 0
//   },
//   {
//     timestamp: '2015-09-01T16:10:00.000Z',
//     temperature: 27.3,
//     dewPoint: 16.9,
//     precipitation: 0
//   },
// ];

// let testObj = {
//     timestamp: '2015-09-01T16:00:00.000Z'
// };

// // If timestamp is found check where it matches the object and delete
//     for (var i = 0; i < metricsArr.length - 1; i++) {
//         if (metricsArr[i].timestamp === testObj.timestamp) {
//             // If there is a match, delete the object
//             metricsArr.splice(i, 1);
//         } else {
//             continue;
//         }
//     }

// metricsArr

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

// Finds the object containing the date within the timestamp
let findObj = (dateString) => {
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

foundStamp = findObj('2015-09-01T16:10:00.000Z');

// TESTING GET STATS FEATURE
// const metricsArr = [
//       {
//         timestamp: '2015-09-01T16:00:00.000Z',
//         temperature: 27.1,
//         dewPoint: 16.9
//       },
//       {
//         timestamp: '2015-09-01T16:10:00.000Z',
//         temperature: 27.3
//       },
//       {
//         timestamp: '2015-09-01T16:20:00.000Z',
//         temperature: 27.5,
//         dewPoint: 17.1
//       },
//       {
//         timestamp: '2015-09-01T16:30:00.000Z',
//         temperature: 27.4,
//         dewPoint: 17.3
//       },
//       {
//         timestamp: '2015-09-01T16:40:00.000Z',
//         temperature: 27.2
//       },
//       {
//         timestamp: '2015-09-01T17:00:00.000Z',
//         temperature: 28.1,
//         dewPoint: 18.3
//       }
//     ];

//     // Loops through entire array and grabs key elements
//     let stamp = (dateString, key = null) => {
//         let stampArr = [];
//         // Loop through each object in array
//         for (var i = 0; i < metricsArr.length - 1; i++) {
//             if (metricsArr[i].timestamp.includes(dateString) && key !== null && metricsArr[i][key]) {
//                 // If there is a match, key is provided, and key exists -> push object into array
//                 stampArr.push(metricsArr[i][key]);
//             } else if (metricsArr[i].timestamp.includes(dateString) && key === null) {
//                 // If there is a match, key is not provided -> push object into array
//                 stampArr.push(metricsArr[i]);
//             } else {
//                 continue;
//             }
//         }
//         // Return array
//         return stampArr;
//     };

//     // Returns the average of min and max
//     let average = (keyword) => {
//         let min = Math.min(...stamp('2015-09-01', keyword));
//         let max = Math.max(...stamp('2015-09-01', keyword));
//         let average = (max + min) / 2;
//         return average;
//     };

//     // Builds and returns a data object based on a specified metric
//     let buildObj = (keyword) => {
//         let dataObj = [
//             {
//                 metric: keyword,
//                 stat: 'min',
//                 value: Math.min(...stamp('2015-09-01', keyword))
//             },
//             {
//                 metric: keyword,
//                 stat: 'max',
//                 value: Math.max(...stamp('2015-09-01', keyword))
//             },
//             {
//                 metric: keyword,
//                 stat: 'average',
//                 value: average(keyword)
//             }
//         ];
//         return dataObj;
//     };

// tempData = buildObj('temperature');
