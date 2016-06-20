var messages= require('../GetEmailBody.js');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

//var parser=function(){
	messages().then(function(data){
		var Obj={};
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
//					emitter.emit('data',Obj);
					console.log(Obj);
				}
				catch(E){
					console.log('replace did not worked error : ',E,' xx =' , xx);
				}
			}
			else{
				
			}
		});
	}).catch(function(error){
		console.log("error "+ error);
	});
//}

//module.exports=parser;