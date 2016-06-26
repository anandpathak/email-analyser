var google = require('googleapis');
var promise= require('promise');
var EmailID= require('./FetchEmailIds.js');

var EmailMessages = function(){
	return new Promise(function(fulfill, reject){
		EmailID().then(function(List){
			var emailData=new Array();
			var gmail = google.gmail('v1');
			var count=1;
			List.messagesList.forEach(function(value,index,size){
				setTimeout(function(){
					gmail.users.messages.get({
						'auth':List.auth,
						'id':value.id,
						'userId': 'me',
						'format' : 'full'
					},function(err,response){
						if(err){
							console.log(err);
						}
						else{
							if(response.payload.mimeType.indexOf('text/html') != -1)
								emailData.push({
									message : new Buffer(response.payload.body.data,'base64').toString('utf-8'),
									time : response.internalDate 
								});
							if(response.payload.mimeType.indexOf('multipart/alternative') != -1)
								emailData.push({
									message : new Buffer(response.payload.parts[0].body.data , 'base64').toString('utf-8'),
									time: response.internalDate
								});
							
								//code to handle mixed type and other type 
						}
						
						if(count == List.messagesList.length){
							fulfill(emailData);
						}
						else{
//							process.stdout.cursorTo(0);
							process.stdout.write(".");
							
						}
						count++;						
					});
				},index*100);
			});
		})
		.catch(function(err){
			reject(null);
		});
	});
	
}
/*EmailMessages().then(function(data){
	//console.log("here is no data"+data);
	console.log(data);
})
.catch(function(err){
	console.log("here is the problem "+err);
});*/
module.exports=EmailMessages;