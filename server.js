var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www'));

var host = process.env.VCAP_APP_HOST || '0.0.0.0';
var port = process.env.VCAP_APP_PORT || 80;

app.listen(port || 80);

console.log("msg"); 
