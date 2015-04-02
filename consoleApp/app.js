// you don't have to include the .js at the end if you dont want to
var profile = require("./profile.js");
// var users = ["chalkers", "joykesten2"];


// users.forEach(function(username) {
// 	profile.get(username);
// });

// same as above
// users.forEach(profile.get);

var users = process.argv.slice(2);
users.forEach(profile.get);