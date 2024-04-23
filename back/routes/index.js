var express = require('express');
var router = express.Router();
var database = require('../database');
require('dotenv').config(); // INSTALLER DOTENV = npm install dotenv
var clientSecret = process.env.CLIENT_SECRET;
const querystring = require('querystring'); // A IMPORTER POUR LES FONCTIONS DES ROUTES

// RANDOM GENERATOR
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////// API OAUTH STEP 1
router.get('/auth', function(req, res) {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';
    var clientId = process.env.CLIENT_ID;
    var redirectUrl = process.env.REDIRECT_URL;

    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code', // ELEMENT QUI SE RETROUVE DANS L'URL QUAND L'USER ACCEPTE L'AUTH
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUrl,
        state: state // ELEMENT QUI SE RETROUVE DANS L'URL QUAND L'USER ACCEPTE L'AUTH
      })); 
  });


////////////////////////////////////////////////////////////////////////////////////////////////// API OAUTH STEP 2
router.get('/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirectUrl,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
      },
      json: true
    };
  }
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