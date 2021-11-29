const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const routes = (db) => {
  const recordsCollection = db.collection('records');
  // This section will help you get a list of all the records.
  recordRoutes.route("/records").get(function (req, res) {
    recordsCollection
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

  // This section will help you get a single record by id
  recordRoutes.route("/records/:id").get(function (req, res) {
    let myquery = { _id: ObjectId(req.params.id) };
    recordsCollection.findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  // This section will help you create a new record.
  recordRoutes.route("/records").post(function (req, response) {
    const { name, position, level } = req.body;
    let myobj = {
      name,
      position,
      level,
    };
    console.log(req.body);
    recordsCollection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

  // This section will help you update a record by id.
  recordRoutes.route("/records/:id").post(function (req, response) {
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        person_name: req.body.person_name,
        person_position: req.body.person_position,
        person_level: req.body.person_level,
      },
    };
    recordsCollection
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      });
  });

  // This section will help you delete a record
  recordRoutes.route("/records/:id").delete((req, response) => {
    let myquery = { _id: ObjectId(req.params.id) };
    recordsCollection.deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.status(obj);
    });
  });

  return recordRoutes;
};
module.exports = routes;
