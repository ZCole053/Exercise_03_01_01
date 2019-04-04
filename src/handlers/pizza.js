var dataStore = require('../lib/dataStore');

module.exports = function (request, reply) {
  const {ticker} = request.params;//changes from var to const

  //before
  //var ticker = request.params.ticker;//changes from var to const

  if (!ticker) {
    return reply('No ticker provided');
  }

  dataStore.getPizza(ticker) 
  .then(reply)//callback gives err either one will be populated and returns the reply
  .catch(reply)
};
