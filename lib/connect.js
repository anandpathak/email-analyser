var fs = require('fs');
var readline = require('readline');
var googleAuth = require('google-auth-library');
//var CONFIG= require('./configuration.js');
var promise= require('promise');

var SCOPES=['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/spreadsheets.readonly'];


var connectOauth2 = function (KEY) {
  return new promise(function(fulfill, reject){
        try{
          var clientSecret = KEY.installed.client_secret;
          var clientId = KEY.installed.client_id;
          var redirectUrl = KEY.installed.redirect_uris[0];
        }
        catch(Err){
          throw Err;
        }
        var auth = new googleAuth();
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
        getNewToken(oauth2Client, function(data){
          if(data == null)
            reject("can't create Token");
          else 
            fulfill (data);
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
      callback(oauth2Client);
    });
  });
}
module.exports=connectOauth2;