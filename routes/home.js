var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.all('/', function(req, res) {
    console.log(req.user)
});

module.exports = router;
