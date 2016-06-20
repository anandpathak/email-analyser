var google = require('googleapis');
var connect = require('./connect.js');
CONFIG = require('./configuration.js');

var spreadsheetWrite = function(data){
	
	connect().then(function(auth){
		var sheets= google.sheets('v4');
		
		createSheet(function(ID){
			if(ID !=null){
				console.log(ID);
				sheets.spreadsheets.values.update({
					auth:auth, 
					spreadsheetId : ID, 
					resource : data, 
					valueInputOption : 'USER_ENTERED', 
					range  : 'A1:Z100'
				},function(err,response){
						if (err)
							console.log(err);
						else
							console.log(response);
				})
			}
			
		});
		function createSheet(callback){
			var SheetConfig= {
				properties : {
					title : CONFIG.sheet.sheetName
				}
			}
			sheets.spreadsheets.create({
				auth: auth,
				resource : SheetConfig
			},function(err, response){
				if(err){
					console.log("Error : "+ err);
					callback(null);
				}
				else{
					console.log(response);
					callback(response.spreadsheetId);
				}
			});
		}
	})
}

module.exports=spreadsheetWrite;