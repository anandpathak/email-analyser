var google = require('googleapis');

var connect = require('./connect.js');
CONFIG = require('./configuration.js');

var promise= require('promise');

var FetchMessageId= function(){

	return new Promise(function(fulfill, reject){
		connect().then(function(auth){		
			var gmail = google.gmail('v1');
			var messagesList= new Array();
			var NextToken=null;
			FirstList(auth,function(err, data){
				if(err){
					console.log(err);
					reject(err);
				}
				else{
					messagesList= data.messages;
					//console.log(JSON.stringify(messagesList));
					var NextToken=data.nextPageToken || null;
					fetchMore(NextToken);
					function fetchMore(NextToken){
						gmail.users.messages.list({
							'auth':auth, 
							'userId':'me',
							'includeSpamTrash':CONFIG.Search.includeSpamTrash,
							'q': CONFIG.Search.mail_search,
							'pageToken':NextToken
						}, function(err,response){
//							console.log(NextToken);
							if(err){
								console.log(err);
								NextToken=null;
								reject(err);
							}
							else{
								NextToken=response.nextPageToken;
								//messagesList.push(response.messages);
								if(typeof response.messages != "undefined")
									response.messages.forEach(function(value,index, array){
										messagesList.push(value);
									});
//								console.log("\n\n : "+ NextToken);	
								if(NextToken == null)
									fulfill(messagesList);
								else
									fetchMore(NextToken);
							}
						});
					}
				}
			});
		})
		.catch(function(Err){
			console.log(Err.toString());
		});			
	});
}
function FirstList(auth,callback){
	var gmail = google.gmail('v1');
	gmail.users.messages.list({
		auth:auth,
		userId : 'me',
		includeSpamTrash : CONFIG.Search.includeSpamTrash,
		q : CONFIG.Search.mail_search
	},function(err,response){
		if(err){
			callback("messages not found", null);
		}
		else
			callback(null, response);
	});
}
/*FetchMessageId().then(function(data){
	console.log(data.length);
}).catch(function(err){
	console.log("here is error" + err);
});
*/
module.export= FetchMessageId;