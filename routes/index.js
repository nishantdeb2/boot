module.exports={
   user: require('./user'),
   job: require('./job'),
   jobaddress:require('./jobaddress')
}
const user = require('./user');
const job = require('./job');
module.exports = [].concat(user, job);
