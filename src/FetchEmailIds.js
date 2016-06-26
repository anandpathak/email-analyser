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
							if(err){
								console.log(err);
								NextToken=null;
								reject(err);
							}
							else{
								NextToken=response.nextPageToken;
								if(typeof response.messages != "undefined")
									response.messages.forEach(function(value,index, array){
										messagesList.push(value);
									});
								if(NextToken == null)
									fulfill({'auth':auth, 'messagesList':messagesList});
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
			callback("messages List not found "+err, null);
		}
		else
			callback(null, response);
	});
}

module.exports= FetchMessageId;