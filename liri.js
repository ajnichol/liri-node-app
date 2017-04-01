//grabbing twitter info from keys.js
var keysExport = require("./keys.js");
//setting twitter object from keys.js into a variable
var keysData = keysExport.twitterKeys;
//storing first commandline argument
var firstCmndArg = process.argv[2];
//storing second commandline argument
var secondCmndArg = process.argv[3];

//////////////////////////////////////////////twitter/////////////////////////////
//checking if user's input matches our condition, if it does we get information from twitters servers
if(firstCmndArg === "my-tweets") {
	//building our twitter request
	var params = {screen_name: 'AlexnBtcmp'};
	//Twitter request
	keysData.get('statuses/user_timeline', params, function(error, tweets, response) {

		//if there is an error from our request, log it
	  if (error) {
	    console.log(error);
	  }
	  //loop through our object from twitter and get the values of text and date
	  for(var twitProp in tweets){

	  		var appendTweets = require("fs");

	  		console.log(tweets[twitProp].text + " " + tweets[twitProp].created_at);

	  		appendTweets.appendFile("log.txt", tweets[twitProp].text + " " + tweets[twitProp].created_at, function(err){
	  			if(err){
	  				console.log(err);
	  			}
	  		});
		}

	});
}

////////////////////////////////////////Spotify/////////////////////////////////////
//checking if user's input matches our condition. If user enters first command line argument and specifies a song 
else if(firstCmndArg === "spotify-this-song" && secondCmndArg !== undefined) {
	//requireing the npm spotify package
	var Spotify = require("spotify");
	//Spotify server search
	Spotify.search({type: "track", query: secondCmndArg}, function(error, data){

		var appendSpotify = require("fs");
		//if there is any error, log the error
		if(error){
			console.log(error);
		}
		//otherwise log the the information we want our user to see 
		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Song: " + data.tracks.items[0].name);
		console.log("Link: " + data.tracks.items[0].preview_url);
		console.log("Album: " + data.tracks.items[0].album.name);

		var artist = data.tracks.items[0].artists[0].name;
		var song = data.tracks.items[0].name;
		var link = data.tracks.items[0].preview_url;
		var album = data.tracks.items[0].album.name;

		appendSpotify.appendFile("log.txt", "Artist: " + artist + ", " + "Song: " + song + ", " +"Link: " + link + ", " + "Album: " + album, function(error){
			if(error){
				console.log(error);
			}
		});
		
	});
}
//checking if user's input match our condition. If user enters first command line argument and doesn't specify a song
else if(firstCmndArg === "spotify-this-song" && secondCmndArg === undefined){
	//require spotify npm package
	var newSpotify = require("spotify");
	//if user doesnt specify a song we make sure a default song is chosen
	secondCmndArg = "The Sign";
	//new spotify server search if user doesn't choose a song
	newSpotify.search({type: "track", query: secondCmndArg}, function(error, resp){

		var appendAce = require("fs");
		//if there is an error, log the error
		if(error){
			console.log(error);
		}
		//otherwise log the information we want to show the user 
		console.log("Artist: " + resp.tracks.items[2].artists[0].name);
		console.log("Song: " + resp.tracks.items[2].name);
		console.log("Link: " + resp.tracks.items[2].preview_url);
		console.log("Album: " + resp.tracks.items[2].album.name);

		var newArtist = resp.tracks.items[2].artists[0].name;
		var newSong = resp.tracks.items[2].name;
		var newLink = resp.tracks.items[2].preview_url;
		var newAlbum = resp.tracks.items[2].album.name;

		appendAce.appendFile("log.txt", "Artist: " + newArtist + ", " + "Song: " + newSong + ", " + "Link: " + newLink + ", " + "Album: " + newAlbum, function(error){
			if(error){
				console.log(error);
			}
		});
		
	});
}

////////////////////////////////////////////read file///////////////////////////////////////////////////////
//checking if user's input matches our condition. If user matches first command line argument and doesnt specify second command line argument
else if(firstCmndArg === "do-what-it-says" && secondCmndArg === undefined){
	//requiring the file system npm package
	var fileSystem = require("fs");
	//reading the text file and it's contents
	fileSystem.readFile("random.txt", "utf8", function(error, data){
		//requiring the spotify npm package
		var readSpotify = require("spotify");
		//if there is an error reading the file, log the error
		if(error){
			console.log(error);
		}
		//otherwise split the string of data in the text file by comma
		var dataArr = data.split(",");
		//after splitting, data becomes an array, which we make sure second command line arugment becomes the second index in the array, which is the song
		secondCmndArg = dataArr[1];
		//request data from spotify
		readSpotify.search({type: "track", query: secondCmndArg}, function(err, resp){
			//if there is an error we log it
			if(err){
				console.log(err);
			}
			//otherwise show user the information we want 
			console.log("Artist: " + resp.tracks.items[0].artists[0].name);
			console.log("Song: " + resp.tracks.items[0].name);
			console.log("Link: " + resp.tracks.items[0].preview_url);
			console.log("Album: " + resp.tracks.items[0].album.name);
			
		});
	});
}

/////////////////////////////////////////////OMDB//////////////////////////////////////
//checking if our user's input matches our condition. 
else if(firstCmndArg === "this-movie" && secondCmndArg !== undefined) {
	//require the request nmp package
	var request = require("request");
	//make a request to omdb api to retrieve movie data
	request("http://www.omdbapi.com/?t=" + secondCmndArg + "&y=&plot=short&r=json", function(error, resp, body){

		var appendMovie = require("fs");
		//if there is an error with the request we log the error
		if(error){
			console.log(error);
		}
		//otherwise parse the data we get back from omdb, because if not we cant use dot notation to grab the movie information
		var newBody = JSON.parse(body);
		//gather movie information we want to show our user
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

		var title = newBody.Title;
		var director = newBody.Director;
		var releaseDate = newBody.Released;
		var movieRating = newBody.imdbRating
		var country = newBody.Country;
		var language = newBody.Language;
		var plot = newBody.Plot;
		var actors = newBody.Actors;
		var rotten = newBody.Ratings[1].Value;
		var website = newBody.Website;

		appendMovie.appendFile("log.txt", "Title: " + title + ", " + "Director: " + director + ", " + "Release Date: " + releaseDate + ", " + "IMDB Rating: " + movieRating + ", " + "Country: " + country + ", " + "Language: " + language + ", " + "Plot: " + plot + ", " + "Actors: " + actors + ", " + "Rotten Tomatoes Rating: " + rotten + ", " + "Website: " + website, function(err){
			if(error){
				console.log(error);
			}
		})
		
	});
}else{
	var newRequest = require("request");
	//else if none of our conditions are met above show our user the movie information to mr nobody (which i havent seen)
	newRequest("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json", function(err, reply, bod) {

		var appendDefault = require("fs");
		//if there is an error we log the error
		if(err){
			console.log(err);
		}
		//parse the data so we can use dot notation to grab the movie information
		var content = JSON.parse(bod);
		//grab everthing we want to show our users about the mr. nobody
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

		var newTitle = content.Title;
		var newDirector = content.Director;
		var newReleaseDate = content.Released;
		var newMovieRating = content.imdbRating
		var newCountry = content.Country;
		var newLanguage = content.Language;
		var newPlot = content.Plot;
		var newActors = content.Actors;
		var newRotten = content.Ratings[1].Value;
		var newWebsite = content.Website;

		appendDefault.appendFile("log.txt", "Title: " + newTitle + ", " + "Director: " + newDirector + ", " + "Release Date: " + newReleaseDate + ", " + "IMDB Rating: " + newMovieRating + ", " + "Country: " + newCountry + ", " + "Language: " + newLanguage + ", " + "Plot: " + newPlot + ", " + "Actors: " + newActors + ", " + "Rotten Tomatoes Rating: " + newRotten + ", " + "Website: " + newWebsite, function(error){
			if(error){
				console.log(error);
			}
		})		
	});
}


