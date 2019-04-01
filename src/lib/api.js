var request = require('request'),
  Pizza = require('../models/pizza');

var localPort;

function initPort (port) {
  localPort = port;
}

//changed
function getAllQuotes () {
  return new Promise((resolve, reject) => {
    request('http://localhost:' + localPort + '/quotes', function (error, res, body) {
      if (error) {
        reject(error);
      }else{
        resolve(JSON.parse(body));
      }
    });
  });
}

//
function getPizza (ticker) {
      return new Promise((resolve, reject) => {
        //moved into the promise
        request('http://localhost:' + localPort + '/pizza/' + ticker, function (error, res, body) {
          if(error){
            reject(error);
          }else{
            resolve(Pizza.hydrate(JSON.parse(body)));
          }
          //removed
          // if (callback) {
          //   callback(error, Pizza.hydrate(JSON.parse(body)));
          // }
      });
//function getPizza (ticker, callback) { removing call back
  // request('http://localhost:' + localPort + '/pizza/' + ticker, function (error, res, body) {
  //   if (callback) {
  //     callback(error, Pizza.hydrate(JSON.parse(body)));
  //   }
  });
}


function getAllPizzas () {
  return new Promise((resolve,reject) => {
    request('http://localhost:' + localPort + '/pizzas', function (error, res, body) {
      if (error) {
        reject(error);
      }else{
        const staticPizzas = JSON.parse(body),
          pizzas = [];
  
          //it changes in the for loop but stays local
        for (let ix in staticPizzas) {
          pizzas.push(Pizza.hydrate(staticPizzas[ix]));
        }
        resolve(pizzas);
      }
    });
  });
}

// function getAllPizzas (callback) {
//   request('http://localhost:' + localPort + '/pizzas', function (error, res, body) {
//     if (callback) {
//       var staticPizzas = JSON.parse(body),
//         pizzas = [];

//       for (var ix in staticPizzas) {
//         pizzas.push(Pizza.hydrate(staticPizzas[ix]));
//       }
//       callback(error, pizzas);
//     }
//   });
// }

module.exports = {
  initPort: initPort,
  getAllQuotes: getAllQuotes,
  getPizza: getPizza,
  getAllPizzas: getAllPizzas
};
