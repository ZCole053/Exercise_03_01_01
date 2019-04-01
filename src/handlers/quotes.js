var dataStore = require('../lib/dataStore');

//calling with a callback
module.exports = function (request, reply) {
  dataStore.getAllQuotes() 
  .then(reply)
  .catch(reply);
    // if (err) {
    //   console.error(err);
    //   reply(err);
    // } else {
    //   reply(data);
    // }
};

//before
// module.exports = function (request, reply) {
//   dataStore.getAllQuotes(function (err, data) {
//     if (err) {
//       console.error(err);
//       reply(err);
//     } else {
//       reply(data);
//     }
//   });
// };
