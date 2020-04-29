const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
//this is middleware all static images, files like css are stored inside the given directory
//and while coding the path relative to this directory is used

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", (req, res) => {
  // var mail = req.body;
  // res.send("Hi there" +JSON.stringify(mail));
  // res.write("<h1 >Welcome</h1>");
  //  res.write("Hi "+req.body.firstName+" "+req.body.lastName);
  //  res.send();
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.mail;

  var data = {
    members:[
      {
        email_address: email,
        status : "subscribed",
        merge_fields:{
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
  var url = "https://us4.api.mailchimp.com/3.0/lists/0a27f30dd0";
  const options ={
    method: "POST",
    auth : "rsp:add mailchimp api"
  }
const request =  https.request(url,options,function(response){
  if(response.statusCode === 200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else {
    res.sendFile(__dirname+"/failure.html");
  }
    // response.on("data",function(data){
    //   console.log(JSON.parse(data));
    // });
  });

  request.write(jsonData);
  request.end();
});

//f4338415182ab856cc1779a74287735c-us4 mailchimp api
//0a27f30dd0   list





app.listen(3000, () => {
  console.log("server is running on port 3000");
})
