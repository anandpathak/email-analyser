var google = require('googleapis');
var connect = require('../connect.js');


connect().then(function(auth){
	console.log(auth);
		var gmail = google.gmail('v1');
		  gmail.users.labels.list({
		    auth: auth,
		    userId: 'me',
		  }, function(err, response) {
		    if (err) {
		      console.log('The API returned an error: ' + err);
		      return;
		    }
		    var labels = response.labels;
		    if (labels.length == 0) {
		      console.log('No labels found.');
		    } else {
		      console.log('Labels:');
		      for (var i = 0; i < labels.length; i++) {
		        var label = labels[i];
		        console.log('- %s', label.name);
		      }
		    }
		  });
	})
	.catch(function(err){
		console.log(err.toString());
	});

/*connect().then(function(auth){
	var gmail = google.gmail('v1');
  	gmail.users.messages.list({
    auth:auth,
    userId : 'me',
   // includeSpamTrash : CONFIG.search.includeSpamTrash,

//    labelIds: CONFIG.search.labelIds,
    //maxResults : CONFIG.search.maxResults || 1,
//    q : CONFIG.search.mail_search
  }, function (err, response){
      if (err){
        console.log('No Message Found');
      }
      else {
      		console.log(response);
      }
  });

});*/
connect().then(function(auth){
	
});