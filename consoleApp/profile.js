// Problem: We need a simple way to look at the user;s badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouses's API to get profile information to print out

// Imports aka requires for node.js
var http = require("http");



// Print out message
function printMessage(username, badgeCount, points) {
	var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
	console.log(message);
}

function printError(error) {
	console.error(error.message);
}

function get(username) {

	// Connect to the API URL (http://teamtreehouse.com/username.json)
	var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response){
		// prints out the response code e.g 200
		// console.log(response.statusCode);

		var body = "";

		//Read the data from the 
		response.on('data', function(chunk){
			body += chunk;
		});

		// When the respnose is done the callback is executed
		response.on('end', function(){

			if(response.statusCode === 200) {

				try {
					// Parses the string into a Javascript Object
					var profile = JSON.parse(body);
					//the typeof keyword tells you what type your variable is.
					// console.log(typeof body);
					printMessage(username, profile.badges.length, profile.points.JavaScript);
				} catch(error) {
					// Print error
					printError(error);
				}

			} else {
				printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
			}
			
			
		});

	});

	// Handle the error handler on the request
	request.on("error", printError)

}

module.exports.get = get;







