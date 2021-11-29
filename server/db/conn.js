const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectToServer = function (callback) {
  return new Promise((resolve, reject) => {
    client.connect(function (err) {
      console.log('connection  found or error');
      // Verify we got a good "db" object
      if (err) {
        reject(err);
      }
      resolve(client.db("mydb"));
    });
  });
};


module.exports = {
  connectToServer
};
