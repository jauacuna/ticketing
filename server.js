const crypto = require('crypto');
const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const rp = require("request-promise");
const cookieParser = require('cookie-parser');

// Initialize the web app instance,
const app = express();
app.use(cookieParser());
// Indicate which directory static resources (e.g. stylesheets) should be served from.
app.use(express.static(path.join(__dirname, "public")));
// begin listening for requests
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Express server listening on port " + port);
});

function isUserAuthenticated(){
    
    return true;
}

app.get('/chatBot',  function(req, res) {
    if (!isUserAuthenticated()) {
        res.status(403).send();
        return
    }
    const options = {
        method: 'POST',
        uri: 'https://directline.botframework.com/v3/directline/tokens/generate',
        headers: {
            'Authorization': 'Bearer ' + process.env.WEBCHAT_SECRET
        },
        json: true
    };
    rp(options)
        .then(function (parsedBody) {
            var userid = req.query.userId || req.cookies.userid;
            if (!userid) {
                userid = crypto.randomBytes(4).toString('hex');
                res.cookie("userid", userid);
            }

            var response = {};
            response['userId'] = userid;
            response['userName'] = req.query.userName;
            response['connectorToken'] = parsedBody.token;
            response['optionalAttributes'] = {age: 33};
            if (req.query.lat && req.query.long)  {
                response['location'] = {lat: req.query.lat, long: req.query.long};
            }
            response['directLineURI'] = process.env.DIRECTLINE_ENDPOINT_URI;
            const jwtToken = jwt.sign(response, process.env.APP_SECRET);
            res.send(jwtToken);
        })
        .catch(function (err) {
            res.status(err.statusCode).send();
            console.log("failed");
        });
});