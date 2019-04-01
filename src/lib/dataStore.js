var Pizza = require('../models/pizza');

var data = {};

// initialize data store with bootstrapped data
function init () {
  data.quotes = require('../mock/quotes');
  initPizzas(function (pizzas) {
    data.pizzas = pizzas;
  });
}

function getQuotes (ticker) {
  return data.quotes[ticker];
}


//change back possibly?
function getAllQuotes () {
  return new Promise((resolve) => {
      resolve(data.quotes);
  });
}

function getPizzas () {
  return new Promise((resolve) => {
    resolve(data.pizzas);
  });
}
// function getPizzas (callback) {
//   if (callback) {
//     callback(null, data.pizzas);
//   }
// }

function getPizza (ticker) {
  return new Promise((resolve) => {
    resolve(data.pizzas[ticker]);
  });
}
// function getPizza (ticker, callback) {
//   if (callback) {
//     callback(null, data.pizzas[ticker]);
//   }
// }

function initPizzas (callback) {
  var pizzas = require('../mock/pizzas'),
    realPizzas = {},
    startingDate = new Date();

  pizzas.forEach(function (pizza) {
    //realPizzas[pizza[0]] = new Pizza(startingDate, data.quotes[pizza[0]], pizza[0], pizza[1], pizza[2], pizza[3], pizza[4]);
    realPizzas[pizza[0]] = new Pizza(startingDate, data.quotes[pizza[0]], ...pizza);//changes are made to this one
  });

  callback(realPizzas);
}


//something of the same name that is assigning something with the same name
module.exports = {
  init,
  getQuotes,
  getAllQuotes,
  getPizzas,
  getPizza
};

//before
// module.exports = {
//   init: init,
//   getQuotes: getQuotes,
//   getAllQuotes: getAllQuotes,
//   getPizzas: getPizzas,
//   getPizza: getPizza
// };
