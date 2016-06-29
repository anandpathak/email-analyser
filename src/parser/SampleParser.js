var messages= require('../GetEmailBody.js');
var sendData= require('../speadsheetSaver.js');

/*retreiving data */
messages().then(function(data){
	//write your code to parse data 

	
	/*saving data to spreadshhet*/
	sendData(data,range);
});