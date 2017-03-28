//dont forget to require spotify and request omdb!!!

var keysExport = require("./keys.js");

var keysData = keysExport.twitterKeys;

var Twitter = require("twitter");

var request = require("request");

var commandArgs = process.argv[2];

console.log(keysData);

console.log("========================================");

// keysData.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=AlexnBtcmp&count=20", function(error, tweets, respnose){

// 	if (error){
// 		console.log(error);
// 	}else{
// 		console.log(tweets);
// 	}

// });

var client = new Twitter({
  consumer_key: 'gX5TuBdEbL5gGgcosl31QYtB4',
  consumer_secret: 'drIIajkQ2JBM1uAFUvclWWGwagEVnVOHFfyHb6GekLmgVUiN61',
  access_token_key: '846569740512325632-ElmN3FKRlSaamOqRsCX6CNSvNE6Nma1',
  access_token_secret: 'lEZ36QwO95UXU2to5Z1uSAVt2n81Wstr4Uue2TKzmmkXC'
});

var params = {screen_name: 'AlexnBtcmp'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {

  if (error) {
    console.log(error);
  }else{
  	console.log(tweets);
  }

});

