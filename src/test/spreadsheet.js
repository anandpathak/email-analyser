var google = require('googleapis');
var connect = require('../connect.js');

var KEYFILE=__dirname+'/../../.credentials/client_secret.json';
var TOKEN_FILE=__dirname+'/../../.credentials/spreadsheet_token.json'; 
var SCOPE='https://www.googleapis.com/auth/spreadsheets.readonly';
connect(KEYFILE,TOKEN_FILE,SCOPE)
	.then(function(auth){
		var sheets = google.sheets('v4');
		sheets.spreadsheets.values.get({
    		auth: auth,
    		spreadsheetId: '19FFlu45TBnEP_QotzUykPQvW6vl4W0LcNsKhJaZDqqA',
    		range: 'Class Data!A:B',
  		}, function(err, response) {
    		if (err) {
      			console.log('The API returned an error: ' + err);
//      			return;
    		}
    		else {
    			var rows = response.values;
			    if (rows.length == 0) {
			      console.log('No data found.');
			    } else {
			      console.log('Name, Major:');
			      for (var i = 0; i < rows.length; i++) {
			        var row = rows[i];
			        // Print columns A and E, which correspond to indices 0 and 4.
			        console.log('%s, %s', row[0], row[4]);
			    	}
			    }
    		}
    	});

	})
	.catch(function(err){
			console();
	});

