var router = require('express').Router();
var Cookie = require('cookies');
var HttpStatus = require('http-status-codes');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var authUtils = require('../utils/auth');
var debug = require('debug')('routes/auth');
var emailUtils = require('../utils/email');
var config = require('../../config.json');
var serverSecret = process.env.SERVER_SECRET || config.serverSecret;
var cookieSecret = process.env.COOKIE_SECRET || config.cookieSecret;
var ROLES = config.ROLES;

function writeToClient(response, data, error, status) {

    debug('writing to client', data);
    debug('is data error?', error);

    if (error) {
        if(!status)
            status = HttpStatus.BAD_REQUEST;
        response.status(status).send(error);
        return;
    }

    if(typeof data === 'object')
        response.json(data);
    else
        response.send(data);
}


// Example : http://localhost:8080/database/query/{"username":"ihabzh" ,"time": "12:01" , "random": "66"}&key":%20"66"%7D&a196c048361fb127a4a1f6d1f95afd0254b7d700cef7b3df49727c78f1853a4f1fb8964e3fc52cc6503f8379d29f842a0101188e4ea80227a06ded9952fd5fa9
router.post("/login", function (request, response) {
    try {
        var credentials = JSON.parse(request.body.credentials);
        var key = request.body.hash;

        //Var cookie = request.cookie;

        //we get the user password from the DB
        authUtils.login(credentials, key, function (error, user) {

            debug('login result', user);
            debug('login error', error);
            if (user) {
                var cookie = new Cookie(request, response, { //TODO add options for secure when server will run on HTTPS
                    keys: [cookieSecret]
                });

                var options = {
                    algorithm: 'HS512'
                };

                if(!credentials.remember) {
                    debug('remember = false');
                    options.expiresIn = '1h'; //TODO change to longer time
                }

                var token = jwt.sign(user, serverSecret, options);
                cookie.set(config.cookieTokenKey, 'JWT ' + token, {signed: true});
                writeToClient(response, { success: true, name: user.name});
                return;
            }

            writeToClient(response, null, "Error: Login Failed", HttpStatus.UNAUTHORIZED);
        });

    } catch (error) {
        writeToClient(response, null, "Error: Login Request Failed, check input data");
        debug("Login error:", error);
    }

});


router.get('/logout', function(request, response) {
    if(request && request.cookies) {
        var token = request.cookies[config.cookieTokenKey];

        if(token) {
            var cookie = new Cookie(request, response, { //TODO add options for secure when server will run on HTTPS
                keys: [cookieSecret]
            });

            cookie.set(config.cookieTokenKey, "", { maxAge: 0 });
            return writeToClient(response, { success: true });
        }
    }

    writeToClient(response, null, "Error: User is not logged in", HttpStatus.BAD_REQUEST);
});


router.post("/signup", function (request, response) {
    try {
        var user = JSON.parse(request.body.user);
        user.role = ROLES.GUEST;

        authUtils.signUp(user, function (error, result) {

            debug('signup result', result);
            debug('signup error', error);
            if (error) { // user data inserted successfully
                debug('signup sending error');//                emailUtils.confirmationEmail(credentials.email, credentials.name); //FIXME send confirmation email on signup
                return writeToClient(response, result, error, HttpStatus.BAD_REQUEST);

            }
            writeToClient(response, result);
        });

    } catch (error) {
        writeToClient(response, null, "Error: Sign-Up Request Failed", HttpStatus.BAD_REQUEST);
        debug("SignUp error: ", error);
    }

});

router.get('/authenticate', passport.authenticate('jwt', { session: false}), function(request, response) {
    writeToClient(response, { success: true });
});

//router.get("/roles/:exec&:target&:role", function (request, response) {
//    try {
//        var role = request.params.role;
//        var executerUsername = request.params.exec;
//        var targetUsername = request.params.target;
//
//
//        authUtils.setUserRole(role, executerUsername, targetUsername, function (result) {
//            var message = "Cant change the role.";
//
//            if (result) {
//                message = result.toString();
//            }
//
//            writeToClient(response, message);
//
//
//
//        });
//
//    } catch (error) {
//        writeToClient(response, null, "Error: Roles Request Failed, check input data", HttpStatus.BAD_REQUEST);
//        debug("Roles error:", error);
//    }
//
//});

module.exports = router;
