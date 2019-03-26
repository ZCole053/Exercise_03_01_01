var fluxGen = require('../lib/fluxGen');// with moduels if exporting 1 thing 
//it will default to the name of the module (which = no change)

function getRand () {
  return +(Math.random() * 100).toFixed(0);
}

//spread syntax
function Pizza (startingDate, quotes, ...pizzaProps) {//changes into an array
  // var self = this; (remove self variable), it will crash

  this.startingDate = startingDate;
  this.ticker = pizzaProps[0];
  this.name = pizzaProps[1];
  this.startingQuote = pizzaProps[2];
  this.variability = pizzaProps[3] || getRand();//short circut = logical parameters 
  this.positivity = pizzaProps[4] || getRand();//remove getrand() moved to paramter
  this.quotes = quotes || [this.startingQuote];

    //gives a hoisting problem
  // private methods//changing function into varaiable
 var addQuote = (quote) => {
  this.quotes.push(quote);// changing self to this; also changing scope
}

var  getQuote = (quoteIndex) => {//remove return changes self to this and created arrow function
  this.quotes[quoteIndex];
}

  this.getNext = function () {
    var newQuote = fluxGen(this.getLast(), 1, this.variability, this.positivity)[0];
    addQuote(newQuote);
    return newQuote;
  };

  this.getLast = function () {
    return getQuote(this.quotes.length - 1);
  };

  this.getDatedQuotes = function () {
    var quotesMap = {},
      curDate = startingDate;

    this.quotes.forEach(function (quote) {
      quotesMap[curDate] = quote;
      curDate.setDate(curDate.getDate() + 1);
    });

    return quotesMap;
  };


}

Pizza.hydrate = function (pizzaObj) {
  var newPizza = new Pizza(
    pizzaObj.startingDate,
    pizzaObj.quotes,
    pizzaObj.ticker,
    pizzaObj.name,
    pizzaObj.startingQuote,
    pizzaObj.variability,
    pizzaObj.positivity);

  newPizza.quotes = pizzaObj.quotes;
  return newPizza;
};

module.exports = Pizza;
