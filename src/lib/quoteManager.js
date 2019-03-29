var api = require('./api');

//converting into a promise
module.exports = {
  updateQuotes() {
    //creating a new promise and doing a request and response
    //everything was moved into the promise
    return new Promise((resolve, reject) => {
      api.getAllPizzas(function (err, pizzas) {
        var newData = [],pizza;
        if (err) {
          reject(err);
        } else { //added else
          //sets pizza to the key
          for (var key in pizzas) {
            pizza = pizzas[key];
            //taking care of the err.
            //push appends
            newData.push({
              ticker: pizza.ticker,
              nextQuote: pizza.getNext()
            });
          }
          console.log(`${JSON.stringify(newData)} updating quotes`); //readable
          //taking care of succuess
          resolve(newData);
          //console.log(`${newData} updating quotes`); one line,unreadable
        } //end of added else
      });
      //console.log(`newData`);
      //console.log('updating quotes');
      //callback(null, newData); remove completely
      //updateQuotes (callback) { getting ride of call back we don't need it
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