# email-analyser

email-analyser is an application which analyse email and produces analysed reports of the email. 

#### What it does 
>we recieves automated emails from many application like from bank application, social application and many other application. This application will allows you to extract details from those email which can be used to generate graphs or table 

here is examples showing the details which can be extracted using this application 

 - 'did you expense increased with time ?'
 - 'graph of how much money you  paid to a client'
 - 'whom you have emailed most number of the time ?'
 - ![graph-screen-shot](http://demoimageurl.com)

#### Features 
  - It parse email and perfom task based on the result
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
    messages().then(function(data){
        /*your parser code here */
}).catch(function(error){
	console.log("error : "+error);
});
```

**what are you waiting for, just try ! **
