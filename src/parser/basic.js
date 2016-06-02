var messages= require('../GetEmailBody.js');

messages().then(function(data){
	console.log(data[0]+"\n"+data[1]);
//	content.replace(/(<.*.>)/g, "");


}).catch(function(error){
	console.log("error");
});
