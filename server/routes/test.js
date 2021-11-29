const express = require('express');

const testRoute = express.Router();

testRoute.get('/test', function(request, response) {
    response.send('welcome to test');
});


module.exports = testRoute;