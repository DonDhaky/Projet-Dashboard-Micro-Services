var express = require('express');
var router = express.Router();
var database = require('../database');
var cors = require('cors')
require('dotenv').config(); // INSTALLER DOTENV = npm install dotenv
var clientSecret = process.env.CLIENT_SECRET;
const querystring = require('querystring'); // A IMPORTER POUR LES FONCTIONS DES ROUTES
var app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

app.use(express.urlencoded({ extended: true })); // GESTION DES REQUETES EN URLENCODED

router.use(cors())

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
    //////////////////// RECUPERATION DU TOKEN ACCESS
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

    //////////////////// ECHANGE DU TOKEN ACCESS
    request.post(authOptions.url, {
      form: authOptions.form,
      headers: authOptions.headers
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const accessToken = JSON.parse(body).access_token;

      } else {
        console.error('Erreur lors de la récupération du token :', error);
      }
    });
  }
});

///////////////////////////////////////////////////////////////////// GO TO HOME PAGE
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});


//////////////////////////////////////////////////////////////////// REGISTER ON THE SITE
router.post('/register', function(request, response) {

var user_email_address = request.body.user_email_address;
var user_password = request.body.user_password;

if(user_email_address && user_password) {
var chekingMailQuery = `SELECT * FROM user_login WHERE user_email = "${user_email_address}"`;
database.query(chekingMailQuery, function(error, data) {
    if(data.length > 0) {
      response.set('Content-Type', 'application/x-www-form-urlencoded');
      response.send(querystring.stringify({ error: 'This email adress is already in use !' }));
    } else {
        bcrypt.hash(user_password, 10, function(err, hash) {
            if (err) {
                console.error(err);
                response.send('Une erreur a été rencontrée lors du hashage du mot de passe');
                response.end();
            } else {
                // J'insère l'utilisateur dans la base de données avec le mot de passe hashé
                var query = `INSERT INTO user_login (user_email, user_password) VALUES ("${user_email_address}", "${hash}")`;
                database.query(query);
                response.send("Cette requête vient d'être effectuée avec succès");
            }
        });
    }
});

} else {
  response.set('Content-Type', 'application/x-www-form-urlencoded');
  response.send(querystring.stringify({ error: 'Please type valid email and/or password to register.' }));
}
});


//////////////////////////////////////////////////////////////////// LOGIN TO THE SITE
router.post('/login', function(request, response, next) {

  var user_email_address = request.body.user_email_address;
  var user_password = request.body.user_password;

if(user_email_address && user_password) {
    var query = `SELECT * FROM user_login WHERE user_email = "${user_email_address}"`;

    database.query(query, function(error, data) {
        if(data.length > 0) {
            var hashedPassword = data[0].user_password;
            bcrypt.compare(user_password, hashedPassword, function(err, result) {
                if(result == true) {
                    request.session.user_id = data[0].user_id;
                    response.redirect("/");
                } else {
                  response.set('Content-Type', 'application/x-www-form-urlencoded');
                  response.send(querystring.stringify({ error: 'Incorrect password !' }));
                }
            });

        } else {
          response.set('Content-Type', 'application/x-www-form-urlencoded');
          response.send(querystring.stringify({ error: 'Incorrect email adress !' }));
        }
        response.end();
    });
} else {
  response.set('Content-Type', 'application/x-www-form-urlencoded');
  response.send(querystring.stringify({ error: 'Please type valid email and/or password to login.' }));
}
});

///////////////////////////////////////////////////////////////////////// LOGOUT FROM THE SITE
router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

module.exports = router;