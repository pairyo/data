var fs = require('fs');
var _ = require ('underscore');
var redis = require('redis'),
    rClient = redis.createClient();

rClient.on("error", function (err) {
    console.log("Error " + err);
});

var cities = JSON.parse(fs.readFileSync('places.json'));
cities.map(function(city) {
  rClient.sadd("places-" + city.pid, JSON.stringify(city), function() {});
});

rClient.smembers('places-0', function(err, reply) {
  console.log(reply);
});
