var Hapi = require('hapi'),
  Path = require('path');

var server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'ui')
      }
    }
  }
});
// pay attention to the port that the server is running on
var port = process.env.PORT || 8080; // check for 8080
// or  statement.

require('./lib/api').initPort(port);

server.connection({
  port: port
});

// setting up socket.io connection
var io = require('socket.io')(server.listener);
require('./events').register(io);

//converting into a arrow function
//not getting called normally
server.register([require('inert'), require('vision')], (err) => {//debug
  if (err) throw err;

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'ui/templates',
    helpersPath: 'ui/helpers'
  });

  require('./lib/dataStore').init();

  server.route(require('./routes'));
  server.start( (err) => {//converting with fat arrow
    if (err) throw err;
    console.log(`Connected on ${server.info.uri}`);
    //console.log('Connected on ' + server.info.uri);
  });
});