const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { json } = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

/* app.use(express.static(__dirname + '/'));  
Directly write this line with making extra folder for public file like css sheet linked image etc.
*/

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email
    console.log(firstname,lastname,email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/b3c5da4fec";

    const options ={
        method: "POST",
        auth:"vishu1:d402dcc63f1c16416de8af7e9185a831-us20",
    };

    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }
            else {
                res.sendFile(__dirname + "/failure.html");
            }

        })
    }); 

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT,function(){
    console.log("port at 3000");
    console.log(__dirname);
})



// d402dcc63f1c16416de8af7e9185a831-us20

// b3c5da4fec

// https://mailchimp.com/developer/reference/lists/#post_/lists/-list_id-

// https://us4.admin.mailchimp.com/lists/setting?id=367750

// https://mailchimp.com/developer/guide/get-started-with-mailchimp-api-3/#Code_examples

// https://<dc>.api.mailchimp.com/3.0/
// https://us20.api.mailchimp.com/3.0/
