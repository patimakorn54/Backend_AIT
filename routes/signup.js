var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);
// var passport = require('passport');

router.post('/', function(req,res,done){
  // connection.query("SELECT * FROM startup WHERE Username = ?",req.body.user, function(err, rows) {
  //     if (err)
  //         return done(err);
  //     if (rows.length) {
  //         res.send({"report": "0"});
  //     } else {
          var data = {
          Id: req.body.id,
          // Username: req.body.user,
          // Password: req.body.pass,
          Firstname: req.body.first,
          Lastname: req.body.last,
          email: req.body.email,
          Role: req.body.role,
          picture: req.body.picture
          }
					console.log(req.body.first);
          var query = connection.query('insert into startup set ?',data, function(err, result){
						if (err) {
							throw err;
						} else {
							console.log(query.sql)
							res.send({"report": "1"});
						}
          })
        // }})
			})

module.exports = router;
