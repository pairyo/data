var fs = require('fs');
var _ = require ('underscore');
var redis = require('redis'),
    rClient = redis.createClient();

rClient.on("error", function (err) {
    console.log("Error " + err);
});

var cities = JSON.parse(fs.readFileSync('places.json'));
cities.map(function(city) {
  rClient.hset(city.pid , city.id, JSON.stringify(city), function() {});
});

rClient.hvals('0', function(err, reply) {
  console.log(reply);
});
