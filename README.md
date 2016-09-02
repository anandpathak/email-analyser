# email-analyser

email-analyser is an application which analyse email and produces analysed reports of the email. 

#### What it does 
>we recieve automated emails from many application like bank, social application and many others. Email-analyser will allows you to extract details from these emails and you can analysed them for better understanding. 

here is examples showing the details which can be extracted using Email-analyser 

 - 'did your expense increased with time ?'
 - 'graph of how much money you  paid to a client'
 - 'whom you have emailed most number of the time ?'
 - here is the graph showing delivery time taken by different e-commerce company for a user
 ![](https://raw.githubusercontent.com/anandpathak/email-analyser/master/images/product_delivery.png)

#### Features 
  - parse email and perfom task based on the result
  - Allows plugins  to create custom parser
  - Generate beautiful graphs and save data to spread sheet

#### Requirements and  Setup 

 - requires [node.js](https://nodejs.org/en/download/)
 - gmail and spreadsheet [API](https://console.developers.google.com/flows/enableapi?apiid=gmail)
 -  
 - install 
    ```
        npm install botmailer
    ```

##### writing your own parser
add you code to `FileName.js` folder
```
    var emails=require('botmailer');
	/* Gmail Client API key*/
	var KEY={};
	/* EMail Configuration  variable*/
	var CONFIG={}
	emails(KEY,CONFIG,function(err,data){
		if(err)
			throw data;
		else
			/*Here is the emails*/
			console.log(data);
	});
```
CONFIG variable Schema [here !] (src/configuration.js.example) :  
run your code using `node FileName.js`

**what are you waiting for, just try ! **
