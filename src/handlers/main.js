var popGen = require('../lib/popGen'),
  dataStore = require('../lib/dataStore');

module.exports = function (request, reply) {
  var context = {};

  //array name and best practice
  //function calls in this array and each returns a promise
  const promises = [
    popGen.getPopularSlices(),
    popGen.getMostPopular(),
    popGen.getNewestSlice(),
    popGen.getMostImproved(),
    dataStore.getPizzas()
  ];


  //feeding in an array of tasks similar to an array
  //returns only one then passes onto the next function as long as it gets a resolve
  Promise.all(promises)
  .then((results) => {
    const context = {
      popSlices: results[0],
      mostPopular: results[0],
      newestSlice: results[0],
      mostImproved: results[0],
      pizzas: results[0],
    };
    return reply.view('index', context);
  })
  //only way to get a resolve is if all of them succeed
  .catch((err) => {
    console.error(err);
  });

  // popGen.getPopularSlices(function (err, popSlices) {
  //   context.popSlices = popSlices;

  //   popGen.getMostPopular(function (err, mostPopular) {
  //     context.mostPopular = mostPopular;

  //     popGen.getNewestSlice(function (err, newestSlice) {
  //       context.newestSlice = newestSlice;

  //       popGen.getMostImproved(function (err, mostImproved) {
  //         context.mostImproved = mostImproved;

  //         dataStore.getPizzas(function (err, pizzas) {
  //           context.pizzas = pizzas;

  //           return reply.view('index', context);
  //         });
  //       });
  //     });
  //   });
  // });
};