const Hapi = require('hapi');
const routes = require('./routes');
const connection = require('./db.js')
const server = Hapi.server({ port: 3000, host: 'localhost' });

const init = async () => {
  try{
  await connection.connect();
    }
    catch(err){
  throw(err);
  }
  try{
  await server.start();
    }
catch(err){
    throw(err);
  }
    console.log(`Server running at: ${server.info.uri}`);

};
init();
server.route(routes.user);
server.route(routes.job);
server.route(routes.jobaddress);
