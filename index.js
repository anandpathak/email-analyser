'use strict';
var EmailBodies= require('./lib/GetEmailBody');
var fs= require('fs');
var botmailer = function(client_secret,configuration,callback){
	try{
		var KEY={};
		var CONFIG=configuration || {};
		if(typeof client_secret != "object"){
			KEY=JSON.stringify(client_secret);
			CONFIG=JSON.stringify(configuration);
		}
		else{
			KEY=client_secret;
			CONFIG=configuration;
		}
		EmailBodies(KEY,CONFIG).then(function(data){
			callback(false,data);
		})
		.catch(function(err){
			callback(true,err);
		})
	}
	catch(Err){
		throw Err;
	}
	return require('./lib/GetEmailBody.js');

}
module.exports=botmailer;