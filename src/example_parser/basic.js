var messages= require('../GetEmailBody.js');
var sendData= require('../speadsheetSaver.js');

var parser=function(callback){
	messages().then(function(data){
		var OBJ={};
		OBJ.values= new Array();	
		OBJ.values[0]=['stack','status','time', 'Duration','Return Status'];
		//console.log(data[0]);
		data.forEach(function(value,index,size){
			var str=value.message.replace(/<(?:.|\n)*?>/g, '');
			var temp=str.indexOf(' is back UP') == -1 ? 'down' : 'UP';
			if(temp=='UP'){
				try{
					OBJ.values[index+1]=new Array();
					var xx=str.match(/.*(?=\(htt)/g);
					OBJ.values[index+1].push(xx[0].replace(/.*.The monitor /,''));
					OBJ.values[index+1].push('UP');
					OBJ.values[index+1].push(new Date(Number(value.time)));
					OBJ.values[index+1].push(str.match(/\([^\(\)].*?\)/g)[2]);
					OBJ.values[index+1].push(str.match(/\([^\(\)].*?\)/g)[1]);
				}
				catch(E){
					console.log('replace did not worked error : ',E,' xx =' , xx);
				}
			}
			else{
				
			}
			if(index==data.length -1)
				callback(OBJ);
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
	var range='A1:Z'+data.values.length;
	sendData(data,range);
});
//module.exports=parser;