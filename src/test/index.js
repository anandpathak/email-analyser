var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var CONFIG= require('./configuration.js');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = './.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('./.credentials/client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Gmail API.
  //authorize(JSON.parse(content), listLabels);
    authorize(JSON.parse(content), getmails);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
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
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
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

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  var gmail = google.gmail('v1');
  gmail.users.labels.list({
    auth: auth,
    userId: 'me',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var labels = response.labels;
    if (labels.length == 0) {
      console.log('No labels found.');
    } else {
      console.log('Labels:');
      for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        console.log('- %s', label.name);
      }
    }
  });
}
var Name={} , c=0;
function getmails(auth){
  var gmail = google.gmail('v1');
  gmail.users.messages.list({
    auth:auth,
    userId : 'me',
    includeSpamTrash : CONFIG.search.includeSpamTrash,

//    labelIds: CONFIG.search.labelIds,
    maxResults : CONFIG.search.maxResults || 1,
//    q : CONFIG.search.mail_search
  }, function (err, response){
      if (err){
        console.log('No Message Found');
      }
      else {

//          console.log('Message Found ! '+ JSON.stringify(response)+ "\n");
          var i=100;
          response.messages.forEach(function(value,index, array){
            console.log(c++);
              i = i +100;
              setTimeout(function(){
                getmailDetail(auth,value.id ,function(data){
  //                console.log(typeof data.payload.parts);
                  if(typeof data.payload.parts != "undefined"){
                    data.payload.parts.forEach(function(value,index,size){
                      
                    try{
                          var ss=new Buffer(value.body.data, 'base64').toString('ascii');
                          countName(ss,function(){});
                      }
                      catch(E){
                        //do nothing
                      }
                    /*    couting number of times name is taken */
                        
                  });
                  }
                  else {
  //                  console.log(data.payload.body.data);
                    var ss=new Buffer(data.payload.body.data, 'base64').toString('ascii');
                    countName(ss.toString(),function(){});
                  }
  /*              data.payload.headers.forEach(function(value, index,size){
                    
                    if(value.name== 'To'){

                      console.log(index + " "+ JSON.stringify(value));  
                    //}
                });*/
                
              });
            },i);
          });
          
      }
  });
}
function getmailDetail(auth, id,callback){
  var gmail=google.gmail('v1');
  gmail.users.messages.get({
    auth:auth,
    id:id,
    userId:'me'
  }, function (err,response){
      if(err){
        console.log(err);
        throw err;
      }
      else
          callback(response);
  })
}
function countName(data,callback){
//  console.log(data);
  var re = /(?:^|\W)@(\w+)(?!\w)/g, match;
  while (match = re.exec(data)) {
    if(typeof Name[match[1]] != "undefined")
       Name[match[1]]++;
    else
      Name[match[1]]= 1;
    console.log(match[1]);
  }
  fs.writeFile('data.json', JSON.stringify(Name));
  callback();
}