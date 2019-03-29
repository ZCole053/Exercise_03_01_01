var quoteManager = require('./quoteManager');

var runInterval;

module.exports = {
  run (socket) {
    runInterval = setInterval(function () {
      quoteManager.updateQuotes() 
      //quoteManager.updateQuotes(function (err, newData) {
      .then((newData) => {
        socket.emit('new_data', JSON.stringify(newData));
        })
        .catch((err) => {
          console.error(err);
        });
    }, 1000);
  },
  //before
  // run: function (socket) {
  //   runInterval = setInterval(function () {
  //     quoteManager.updateQuotes(function (err, newData) {
  //       socket.emit('new_data', JSON.stringify(newData));
  //     });
  //   }, 1000);
  // },

  stop() {
    clearInterval(runInterval);
  }

  // //before
  // stop: function () {
  //   clearInterval(runInterval);
  // }
};
