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
 - move api key file to new folder named `.credentials`. 
 - rename key file to `client_secret.json`
 - install dependencies
    ```sh
        npm install
    ```

##### writing your own parser
add you code to `src/parser/FileName.js` folder
```sh
    var messages= require('../GetEmailBody.js');
    var sendData= require('../speadsheetSaver.js');
    messages().then(function(data){
        /*your parser code here */
}).catch(function(error){
	console.log("error : "+error);
});
```
run your code using `node FileName.js`

**what are you waiting for, just try ! **
