//dont forget to request omdb!!!

var keysExport = require("./keys.js");

var keysData = keysExport.twitterKeys;

var request = require("request");

var firstCmndArg = process.argv[2];

var secondCmndArg = process.argv[3];

if(firstCmndArg === "my-tweets") {

	var params = {screen_name: 'AlexnBtcmp'};
	//Twitter request
	keysData.get('statuses/user_timeline', params, function(error, tweets, response) {

	  if (error) {
	    console.log(error);
	  }

	  for(var twitProp in tweets){
	  		console.log(tweets[twitProp].created_at + " " + tweets[twitProp].text);
		}

	});
}

if(firstCmndArg === "spotify-this-song") {

	var Spotify = require("spotify");

	// if(secondCmndArg === null) {
	// 	secondCmndArg = "The Sign";
	// }
	//Spotify request
	Spotify.search({type: "track", query: secondCmndArg}, function(error, data){

		if(error){
			console.log(error);
		}

		for(var spotProp in data) {
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song: " + data.tracks.items[0].name);
			console.log("Link: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
		}
	});
}

else if(firstCmndArg === "spotify-this-song" && secondCmndArg === null){

	secondCmndArg = "The Sign";

	Spotify.search({type: "track", query: secondCmndArg}, function(error, data){

		if(error){
			console.log(error);
		}

		for(var spotProp in data) {
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song: " + data.tracks.items[0].name);
			console.log("Link: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
		}
	});
}

// else{
// 	console.log("WRONG INPUT");
// }

