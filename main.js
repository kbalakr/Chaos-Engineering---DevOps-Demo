//var redis = require('redis')
//var multer  = require('multer')
var express = require('express')
var app = express()
// REDIS
//var client = redis.createClient(6379, '127.0.0.1', {})
var ac = 'on';
var r_flag = false;
var temp = 0;
var message = '';
///////////// WEB ROUTES

// Add hook to make it easier to get all visited URLS.



app.get('/gateway', function(req, res)
{
	var num = generateRandomNumber(1,100);
    if (num <= 99)
	{
		res.redirect('/api');
	}	
	else if (num > 99 && num <= 99.5)
	{
	    res.redirect('/apicontrol');
	}
    else if (num > 99.5 && num <= 100)
	{
		res.redirect('/apiexp');
	}	
})

app.get('/ratings', function(req, res)
{
	if (r_flag)
	{
		if (temp==1) message='api experiment message redirected through api since api exp is blocked and the message is '
		res.send(message + 'passed');
		r_flag = false;
		temp = 0 ;
        message='';		
	}
	else
		res.send('Ratings service failed ! Error 500 !');   // This is called if apiexp redirects to /ratings with apiexp in blocked state
})

app.get('/api', function(req, res)
{
	r_flag = true;
    res.redirect('/ratings');		
})

app.get('/apidown', function(req, res)
{
    res.redirect('/ratings');		
})

app.get('/apiexp', function(req, res)
{
	if (ac == 'on')
	{
		r_flag = true;
		res.redirect('/ratings');
	}
	else if (ac == 'off')
	{
		// res.redirect('/ratings');            The message Ratings service failed ! Error 500 ! will be printed.
        temp=1;		                                  //This is done to handle the situation gracefully.
		res.redirect('/api');                   //This is in case the apiexp is blocked and the traffic is redirected through api 
		
	}
})

app.get('/apicontrol', function(req, res)
{
	r_flag = true;
	res.redirect('/ratings');
})

function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

app.get('/apiexpcontrol:*', function(req , res)
{
	var url_route=req.url.split(":");
	ac=url_route[1];
	res.send("ratingcontrol set to " + ac);
})


app.get('/', function(req, res) 
{
	  res.send('hello world')
})





// HTTP SERVER
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

exports 
