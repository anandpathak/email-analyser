var CONFIG= {
	search : {
		/*gmail search parameter 
			e.g  'from : himesh@reshamiya.com'
		*/
		mail_search : ""
		/*Maximum number of emails*/
		,maxResults : 1000
		/* filter using label*/
		,labelIds : 'unread'
		,includeSpamTrash : false
	}
	,
	Rules :[
		{
			type : 'keyword' /*keyword, regex , send_from */
			,action : ''		/*reply , delete , add_lebel , mark_as_read,count*/
			,value : ['']		/*message*/
		}

	]


}
module.exports = CONFIG;