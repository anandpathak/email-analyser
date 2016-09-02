var emails=require('botmailer');

/* Gmail Client API key*/
var KEY={}

/* EMail Configuration  variable*/
var CONFIG={}

emails(KEY,CONFIG,function(err,data){
	if(err)
		throw data;
	else
		/*Here is the emails*/
		console.log(data);
});