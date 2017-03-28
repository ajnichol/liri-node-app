//dont forget to require spotify and request omdb!!!

var keysExport = require("./keys.js");

var keysData = keysExport.twitterKeys;

var keysTwitter = keysExport.Twitter;

var request = require("request");

var commandArgs = process.argv[2];

var params = {screen_name: 'AlexnBtcmp'};

keysData.get('statuses/user_timeline', params, function(error, tweets, response) {

  if (error) {
    console.log(error);
  }

  if(commandArgs === "my-tweets") {
  	for(var prop in tweets){
  		console.log(tweets[prop].created_at + " " + tweets[prop].text);
	};
  }else{
  	console.log("WRONG INPUT");
  	}

});

