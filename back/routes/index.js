var express = require('express');
var router = express.Router();
var database = require('../database');

///////////////////////////////////////////////////////////////////// API
require('dotenv').config();
var scope = 'user-read-private user-read-email';
const spotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new spotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUrl: process.env.REDIRECT_URL
});


///////////////////////////////////////////////////////////////////// API
app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });

///////////////////////////////////////////////////////////////////// GO TO HOME PAGE
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});

//////////////////////////////////////////////////////////////////// REGISTER ON THE SITE
router.post('/register', function(request, response){

    var user_email_address = request.body.user_email_address;

    var user_password = request.body.user_password;

    if(user_email_address && user_password)
    {
        query = `INSERT INTO user_login (user_email, user_password) VALUES ("${user_email_address}", "${user_password}")`; // A EDIT POUR EVITER LES INJONCTIONS
        database.query(query);
        response.send('Your Account Has Been Created Successfully');
    }
    else
    {
        response.send('Please Enter Valid Email Address And Password');
        response.end();
    }

});



//////////////////////////////////////////////////////////////////// LOGIN TO THE SITE
router.post('/login', function(request, response, next){

    var user_email_address = request.body.user_email_address;

    var user_password = request.body.user_password;

    if(user_email_address && user_password)
    {
        query = `
        SELECT * FROM user_login 
        WHERE user_email = "${user_email_address}"
        `;

        database.query(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].user_password == user_password)
                    {
                        request.session.user_id = data[count].user_id;

                        response.redirect("/");
                    }
                    else
                    {
                        response.send('Incorrect Password');
                    }
                }
            }
            else
            {
                response.send('Incorrect Email Address');
            }
            response.end();
        });
    }
    else
    {
        response.send('Please Enter Email Address and Password Details');
        response.end();
    }

});


///////////////////////////////////////////////////////////////////////// LOGOUT FROM THE SITE
router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

module.exports = router;