const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");


let propertiesReader = require("properties-reader");
let propertiesPath = path.resolve(__dirname, "conf/db.properties");
let properties = propertiesReader(propertiesPath);
let dbPprefix = properties.get("db.prefix");
//URL-Encoding of User and PWD
//for potential special characters
let dbUsername = encodeURIComponent(properties.get("db.user"));
let dbPwd = encodeURIComponent(properties.get("db.pwd"));
let dbName = properties.get("db.dbName");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");
const uri = dbPprefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
let db = client.db(dbName);

app.use(cors());
app.use(morgan("short"));
app.use(express.json());

app.set('json spaces', 3);

app.param('collectionName'
   , function (req, res, next, collectionName) {
      req.collection = db.collection(collectionName);
      return next();
   });

app.get('/collections/:collectionName'
   , function (req, res, next) {
      req.collection.find({}).toArray(function (err, results) {
         if (err) {
            return next(err);
         }
         res.send(results);
      });
   });

app.get('/collections/:collectionName/:max/:sortAspect/:sortAscDesc'
   , function (req, res, next) {
      // TODO: Validate params
      var max = parseInt(req.params.max, 10); // base 10
      let sortDirection = 1;
      if (req.params.sortAscDesc === "desc") {
         sortDirection = -1;
      }
      req.collection.find({}, {
         limit: max, sort: [[req.params.sortAspect,
            sortDirection]]
      }).toArray(function (err, results) {
         if (err) {
            return next(err);
         }
         res.send(results);
      });
   });

app.get('/collections/:collectionName/:id'
   , function (req, res, next) {
      req.collection.findOne({ _id: new ObjectId(req.params.id) }, function (err, results) {
         if (err) {
            return next(err);
         }
         res.send(results);
      });
   });

app.delete('/collections/:collectionName/:id'
   , function (req, res, next) {
      req.collection.deleteOne(
         { _id: new ObjectId(req.params.id) }, function (err, result) {
            if (err) {
               return next(err);
            } else {
               res.send((result.deletedCount === 1) ? { msg: "success" } : { msg: "error" });
            }
         }
      );
   });

app.post('/collections/:collectionName'
   , function (req, res, next) {
      // TODO: Validate req.body
      req.collection.insertOne(req.body, function (err, results) {
         if (err) {
            return next(err);
         }
         res.send(results);
      });
   });

app.put('/collections/:collectionName/:id'
   , function (req, res, next) {
      // TODO: Validate req.body
      req.collection.updateOne({ _id: new ObjectId(req.params.id) },
         { $set: req.body },
         { safe: true, multi: false }, function (err, result) {
            if (err) {
               return next(err);
            } else {
               res.send((result.matchedCount === 1) ? { msg: "success" } : { msg: "error" });
            }
         }
      );
   });

var staticPath = path.join(__dirname, "assets");
app.use(express.static(staticPath));

app.use(function(req, res){
   res.status(404);
   res.send("File not found. Try again.")
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
   console.log("App started on port: " + port);
});