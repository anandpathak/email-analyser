var messages= require('../GetEmailBody.js');
var sendData= require('../speadsheetSaver.js');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var parser=function(callback){
	messages().then(function(data){
		var Obj={},mainObj;
		data.forEach(function(value,index,size){
			var str=value.replace(/<(?:.|\n)*?>/g, '');
			Obj.status=str.indexOf(' is back UP') == -1 ? 'down' : 'UP';
			if(Obj.status=='UP'){
				try{
					Obj.down_time=str.match(/\([^\(\)].*?\)/g)[2];
					var xx=str.match(/.*(?=\(htt)/g);
					//console.log(xx);
					Obj.stack=xx[0].replace(/.*.The monitor /,'');
					Obj.returns=str.match(/\([^\(\)].*?\)/g)[1];
					mainObj.push(obj);
				}
				catch(E){
					console.log('replace did not worked error : ',E,' xx =' , xx);
				}
			}
			else{
				
			}
			if(index==data.length -1)
				callback(mainObj);
		});
	}).catch(function(error){
		console.log("error "+ error);
	});
}
parser(function(data){
	var xx={
		values: [['fal', 'aam', 'sev' , 'tarbooz'],
				 ['sabzi','govi', 'tamatar', 'aaloo']
				]
	}
	sendData(xx);
});
//module.exports=parser;