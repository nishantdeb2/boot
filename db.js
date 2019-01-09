const MongoClient = require('mongodb').MongoClient;
const model = require('./model');

const url = 'mongodb://localhost:27017';

const dbName = 'npm_hapi8';

// Use connect method to connect to the server
async function dbcon(){
  try{
    MongoClient.connect(url, (err, client)=> {
    console.log("COnnected database");
    global.db = client.db(dbName);
    // model.user.collection();
    // model.job.collection();
  });
}catch(err){
  throw(err);
}
}

 module.exports = {
   connect: dbcon
 }
