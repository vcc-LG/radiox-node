var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var d3 = require("d3");
var fs = require("fs")
// var MongoClient = require('mongodb').MongoClient;

const db = require('monk')('localhost/radio_database')
const collection = db.get('radio_collection')
db.then(() => {
  console.log('Connected correctly to server')
})

app.set('view engine', 'ejs');  //tell Express we're using EJS


// db.collection('radio_collection', function(err, collection) {
//     collection.find().toArray(function(err, items) {
//         res.render(path + "index.ejs",{val:items});
//     });
// });
// collection.find().toArray(function(err, items) {
//
// MongoClient.connect("mongodb://localhost:27017/radio_database", function(err, db) {
//   if(!err) {
//     var collection = db.collection('radio_collection')
//     console.log("We are connected");
//     collection.aggregate([{"$group" : {_id:"$year", count:{$sum:1}}}])(function(err, items) {
//       console.log(items);
//       res.render(path + "index.ejs",{val:items});
//     });
//   }

// router.get("/",function(req,res){
//   collection.aggregate([{ $group: {"_id": "$song_year", "count":{ $sum: 1}}}],function(e,vals){
//       res.render(path + "index.ejs",{vals:year_histo});
//   });
// });

// collection.aggregate([{ $group: {"_id": "$song_year", "count":{ $sum: 1}}}],
// function(e,workflow){
//     console.log(workflow);
// });

// collection.findOne({},{'limit':1},function(e,workflow){
//     console.log(workflow);
// });


// function queryCollection(collection, callback){
// 	collection.aggregate([{ $group: {"_id": "$song_year", "count":{ $sum: 1}}}])(function(err, result) {
//         if (err) {
//             console.log(err);
//         } else if (result.length > 0) {
//             callback(result);
//         }
//     });
// }
// queryCollection(collection, function(result){
//     console.log(result);
// });


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  collection.aggregate([{'$match': {'song_year': {'$ne': ''}}},{'$match': {'song_year': {'$ne': 0}}},{ $group: {"_id": "$song_year", "count":{ $sum: 1}}}],function(e,vals){
      // console.log(vals);
      res.render(path + "index.ejs",{vals:vals});
  });
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
