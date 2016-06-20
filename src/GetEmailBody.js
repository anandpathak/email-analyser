var google = require('googleapis');
var promise= require('promise');
var EmailID= require('./FetchEmailIds.js');

var EmailMessages = function(){
	return new Promise(function(fulfill, reject){
		EmailID().then(function(List){
			var emailData=new Array();
			var gmail = google.gmail('v1');
//			console.log(List);
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
							//reject(err);
						}
						else{
							if(typeof response.payload.body.data !="undefined"){
								emailData.push(new Buffer(response.payload.body.data,'base64').toString('utf-8'));
//								console.log(new Buffer(response.payload.body.data,'base64').toString('utf-8'));
							}
							else if(typeof response.payload.parts[0].body.data !="undefined"){
								emailData.push(new Buffer(response.payload.parts[0].body.data,'base64').toString('utf-8'));
//									console.log(new Buffer(response.payload.parts[0].body.data,'base64').toString('utf-8'));
								//console.log(response.payload.parts[0].body.data,'base64'.toString('utf-8'));
							}
							else if (typeof response.payload.parts[0].parts[0].body.data !="undefined"){
								emailData.push(new Buffer(response.payload.parts[0].parts[0].body.data , 'base64').toString('utf-8'));
							}
							else		
								console.log("email parse failed ! \n"+response);
										//process.exit(1);
						}
						
						if(count == List.messagesList.length){
							//console.log("fulfill"+ emailData);
							fulfill(emailData);
						}
						else{
					//		console.log(count);
					//		process.stdout.clearLine();
							process.stdout.cursorTo(0);
							process.stdout.write("Fetching... "+Math.floor(count*100/List.messagesList.length)+"%");
							
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