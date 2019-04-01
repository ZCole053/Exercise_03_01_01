var api = require('./api'),
  _ = require('lodash');//


  
function getPopularSlices () {
  return new Promise((resolve,reject) => {
    _getFinalQuotes()
    .then((finalQuotes) => {
      const orderedQuotes = 
        _.orderBy(finalQuotes, ['quote'], ['desc']);
        resolve(_.take(orderedQuotes, 4));
    })
    .catch(reject);
  });
}


// function getPopularSlices (callback) {
//   _getFinalQuotes(function (err, finalQuotes) {
//     var orderedQuotes = _.orderBy(finalQuotes, ['quote'], ['desc']);

//     if (callback) {
//       callback(null, _.take(orderedQuotes, 4));
//     }
//   });
// }

function getMostPopular () {
  return new Promise((resolve, reject) => {
    //need to comback and give it a callback
    _getFinalQuotes() 
    .then((finalQuotes) => {
      //changed for least scope possible
      const mostPopular = finalQuotes.reduce(function (best, curr) {
        if (curr.quote > best.quote) {
          return curr;
        }
        return best;
      }, { quote: 0 });
  
        resolve(mostPopular);
    })
    .catch((reject));
  });
}

//before
// function getMostPopular (callback) {
//   _getFinalQuotes(function (err, finalQuotes) {
//     var mostPopular = finalQuotes.reduce(function (best, curr) {
//       if (curr.quote > best.quote) {
//         return curr;
//       }
//       return best;
//     }, { quote: 0 });

//     if (callback) {
//       callback(null, mostPopular);
//     }
//   });
// }

function getNewestSlice () {
  return new Promise((resolve, reject) => {
    api.getPizza('HAWA')
     //success
      .then((pizza) =>{
          resolve({ ticker: 'HAWA', quote: pizza.getLast()});
      })
      //failuar
      //designer choice
      .catch((err) => {
        reject(err);
      });
  });
  //api.getPizza('HAWA', function (err, pizza) {
    // if (callback) {
    //   callback(null, { ticker: 'HAWA', quote: pizza.getLast() });
    // }
}

//before
// function getNewestSlice (callback) {
//   api.getPizza('HAWA')
//   //success
//   .then((pizza) =>{
//       if (callback) {
//         callback(null, { ticker: 'HAWA', quote: pizza.getLast() });
//       }
//   })
//   //failuar
//   .catch((err) => {
//     callback(err);
//   });
//   //api.getPizza('HAWA', function (err, pizza) {
//     // if (callback) {
//     //   callback(null, { ticker: 'HAWA', quote: pizza.getLast() });
//     // }
// }



function getMostImproved () {
  return new Promise((resolve,reject) => {
    //fix the callback
    api.getAllQuotes()
      .then(() => {
          const diffQuotes = [];
        for (var key in allQuotes) {
          diffQuotes.push({
            ticker: key,
            diff: allQuotes[key][allQuotes[key].length - 1] - allQuotes[key][0],
            quote: allQuotes[key][allQuotes[key].length - 1]
          });
        }
        const mostImproved = diffQuotes.reduce(function (best, curr) {
          if (curr.diff > best.diff) {
            return curr;
          }
          return best;
        }, { diff: 0});
        resolve(mostImproved);
      })
      .catch(reject);
  });
}

// function getMostImproved (callback) {
//   api.getAllQuotes(function (err, allQuotes) {
//     var diffQuotes = [],
//       mostImproved;
//     for (var key in allQuotes) {
//       diffQuotes.push({
//         ticker: key,
//         diff: allQuotes[key][allQuotes[key].length - 1] - allQuotes[key][0],
//         quote: allQuotes[key][allQuotes[key].length - 1]
//       });
//     }

//     mostImproved = diffQuotes.reduce(function (best, curr) {
//       if (curr.diff > best.diff) {
//         return curr;
//       }
//       return best;
//     }, { diff: 0});

//     if (callback) {
//       callback(null, mostImproved);
//     }
//   });
// }

function _getFinalQuotes () {
  return new Promise((resolve, reject) => {
    const finalQuotes = [];
    api.getAllQuotes()
    .then((allQuotes) => {
      for (const key in allQuotes) {
        finalQuotes.push({
          ticker: key,
          quote: allQuotes[key][allQuotes[key].length - 1],
          diffLast: _percentOf(allQuotes[key][allQuotes[key].length - 2], allQuotes[key][allQuotes[key].length - 1])
        });
      }
        resolve(finalQuotes);
    })
    .catch(reject);
  });
}

function _percentOf (val1, val2) {
  return (val2 - val1) / val1;
}

module.exports = {
  getPopularSlices,
  getMostPopular,
  getNewestSlice,
  getMostImproved
};


//before
// module.exports = {
//   getPopularSlices: getPopularSlices,
//   getMostPopular: getMostPopular,
//   getNewestSlice: getNewestSlice,
//   getMostImproved: getMostImproved
// };
