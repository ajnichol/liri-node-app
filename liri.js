
var keysExport = require("./keys.js");

var keysData = keysExport.twitterKeys;

var request = require("request");

var firstCmndArg = process.argv[2];

var secondCmndArg = process.argv[3];

//////////////////////////////////////////////twitter/////////////////////////////
if(firstCmndArg === "my-tweets") {

	var params = {screen_name: 'AlexnBtcmp'};
	//Twitter request
	keysData.get('statuses/user_timeline', params, function(error, tweets, response) {

	  if (error) {
	    console.log(error);
	  }

	  for(var twitProp in tweets){
	  		console.log(tweets[twitProp].text + " " + tweets[twitProp].created_at);
		}

	});
}

////////////////////////////////////////Spotify/////////////////////////////////////
else if(firstCmndArg === "spotify-this-song" && secondCmndArg !== undefined) {

	var Spotify = require("spotify");
	//Spotify server search
	Spotify.search({type: "track", query: secondCmndArg}, function(error, data){

		if(error){
			console.log(error);
		}

		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Song: " + data.tracks.items[0].name);
		console.log("Link: " + data.tracks.items[0].preview_url);
		console.log("Album: " + data.tracks.items[0].album.name);
		
	});
}

else if(firstCmndArg === "spotify-this-song" && secondCmndArg === undefined){

	var newSpotify = require("spotify");

	secondCmndArg = "The Sign";
	//new spotify server search if user doesn't choose a song
	newSpotify.search({type: "track", query: secondCmndArg}, function(error, resp){

		if(error){
			console.log(error);
		}

		console.log("Artist: " + resp.tracks.items[2].artists[0].name);
		console.log("Song: " + resp.tracks.items[2].name);
		console.log("Link: " + resp.tracks.items[2].preview_url);
		console.log("Album: " + resp.tracks.items[2].album.name);
		
	});
}

////////////////////////////////////////////read file///////////////////////////////////////////////////////
else if(firstCmndArg === "do-what-it-says" && secondCmndArg === undefined){

	var fileSystem = require("fs");

	fileSystem.readFile("random.txt", "utf8", function(error, data){

		var readSpotify = require("spotify");

		if(error){
			console.log(error);
		}

		var dataArr = data.split(",");

		secondCmndArg = dataArr[1];

		readSpotify.search({type: "track", query: secondCmndArg}, function(err, resp){

			if(err){
				console.log(err);
			}
			
			console.log("Artist: " + resp.tracks.items[0].artists[0].name);
			console.log("Song: " + resp.tracks.items[0].name);
			console.log("Link: " + resp.tracks.items[0].preview_url);
			console.log("Album: " + resp.tracks.items[0].album.name);
			
		});
	});
}

/////////////////////////////////////////////OMDB//////////////////////////////////////
else if(firstCmndArg === "this-movie" && secondCmndArg !== undefined) {

	var request = require("request");

	request("http://www.omdbapi.com/?t=" + secondCmndArg + "&y=&plot=short&r=json", function(error, resp, body){

		if(error){
			console.log(error);
		}

		var newBody = JSON.parse(body);

		console.log("Title: " + newBody.Title);
		console.log("Director: " + newBody.Director);
		console.log("Release Date: " + newBody.Released);
		console.log("IMDB Rating: " + newBody.imdbRating);
		console.log("Country: " + newBody.Country);
		console.log("Language: " + newBody.Language);
		console.log("Plot: " + newBody.Plot);
		console.log("Actors: " + newBody.Actors);
		console.log(newBody.Ratings[1].Source + ": " + newBody.Ratings[1].Value);
		console.log("Website: " + newBody.Website);
		
	});
}else{
	request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json", function(err, reply, bod) {

		if(err){
			console.log(err);
		}

		var content = JSON.parse(bod);

		console.log("Title: " + content.Title);
		console.log("Director: " + content.Director);
		console.log("Release Date: " + content.Released);
		console.log("IMDB Rating: " + content.imdbRating);
		console.log("Country: " + content.Country);
		console.log("Language: " + content.Language);
		console.log("Plot: " + content.Plot);
		console.log("Actors: " + content.Actors);
		console.log(content.Ratings[1].Source + ": " + content.Ratings[1].Value);
		console.log("Website: " + content.Website);
	});
}


