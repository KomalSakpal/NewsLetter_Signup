const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){
	res.sendFile(__dirname + "/sign-up.html");
});

app.post("/", function(r, resp){

	const firstName = r.body.fname;
	const lastName = r.body.lname;
	const email = r.body.email;

	var data = {
		members: [
		{
			email_address: email,
			status: "subscribed",
			merge_fields: 
			{
				FNAME: firstName,
				LNAME: lastName
			}
		}

	]
};

const jsonData = JSON.stringify(data) //converts JavaScript object into JSON format

const url = "https://us8.api.mailchimp.com/3.0/lists/278321afa6";

const options ={
	method: "POST",
	auth: "komal:1fa3667d37a09ac32882f6555524ff43-us8"
};

const request = https.request( url, options, function(response){

	if ( response.statusCode === 200){
		resp.sendFile(__dirname + "/success.html")
	} else{
		resp.sendFile(__dirname + "/failure.html")
	}


	response.on("data", function(data){
		console.log(JSON.parse(data));
	});

});


request.write(jsonData);
request.end();


});

app.post("/failure", function(req,res){
	res.redirect("/")
});

app.listen( 3000, function() {
	console.log("server is running on port 3000");
});




