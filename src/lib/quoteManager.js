var api = require('./api');

module.exports = {
  updateQuotes (callback) {
    api.getAllPizzas(function (err, pizzas) {
      var newData = [],
        pizza;

      for (var key in pizzas) {
        pizza = pizzas[key];
        newData.push({
          ticker: pizza.ticker,
          nextQuote: pizza.getNext()
        });
      }

      console.log(`${JSON.stringify(newData)} updating quotes`);//readable
      //console.log(`${newData} updating quotes`); one line,unreadable
      //console.log(`newData`);
      //console.log('updating quotes');
      callback(null, newData);
    });
  }

  // //before
  // updateQuotes: function (callback) {
  //   api.getAllPizzas(function (err, pizzas) {
  //     var newData = [],
  //       pizza;

  //     for (var key in pizzas) {
  //       pizza = pizzas[key];
  //       newData.push({
  //         ticker: pizza.ticker,
  //         nextQuote: pizza.getNext()
  //       });
  //     }

  //     console.log(newData);
  //     console.log('updating quotes');
  //     callback(null, newData);
  //   });
  // }
};
