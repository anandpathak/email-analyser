var fs = require('fs');
var readline = require('readline');
var googleAuth = require('google-auth-library');
var CONFIG= require('./configuration.js');
var promise= require('promise');

var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = './.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';


//var connect = function (){	
//}
	
//var methods= connect.prototype;
var connectGmail = function () {

	return new promise(function(fulfill, reject){
		fs.readFile('./.credentials/client_secret.json', function processClientSecrets(err, content) {
  			if (err) {
    			console.log('Error loading client secret file: ' + err);
    			reject(err);
  			}
  			try{
  				var credentials= JSON.parse(content);
  			}
  			catch(E){
  				reject(E);
  			}
  			var clientSecret = credentials.installed.client_secret;
  			var clientId = credentials.installed.client_id;
  			var redirectUrl = credentials.installed.redirect_uris[0];
  			var auth = new googleAuth();
  			var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  			fs.readFile(TOKEN_PATH, function(err, token) {
    			if (err) {
      				getNewToken(oauth2Client, function(data){
      					if(data == null)
      						reject("can't create Token");
      					else 
      						fulfill (data);
      				});
    			} else {
      				oauth2Client.credentials = JSON.parse(token);
      				fulfill(oauth2Client);
    			}
 		 	});

		});
	});

}
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        callback(null);
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

module.exports=connectGmail;