var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cros = require('cors');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'akhil',
	database: 'employeeDB'
});

connection.connect((err)=>{
	if(err) throw err;

	console.log("successfully connected");
});

/* GET Employee listing. */
router.get('/show', cros(), function(req, res, next) {


  var query = 'select * from employee_table ORDER BY id DESC';

  connection.query(query, (err, rows, fields)=>{
  	res.send(rows);
  })
});


router.get('/show/:id', cros(), function(req, res, next) {
  // res.render('usr', {
  // 	'animal': 'monkey', 'food': 'banana'
  // });

  var query = `select * from employee_table where id= + ${req.params.id}`;

  connection.query(query, (err, rows, fields)=>{
  	res.send(rows);
  })
});

router.delete('/delete/:id', cros(), function(req, res, next) {


  var query = `delete from employee_table where id = ${req.params.id}`;

  connection.query(query, (err, rows, fields)=>{
  	res.json(200);
  })
});

router.post('/add', cros(), function(req, res, next) {
 var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var age = req.body.age;
  var ph_no = req.body.ph_no;
  var designation = req.body.designation;
  var gender = req.body.gender;
  console.log(firstName, lastName, age, ph_no, designation, gender);
  var query = `INSERT INTO employee_table(firstName, lastName, age, ph_no, designation, gender) VALUES ('${firstName}', '${lastName}', ${age}, ${ph_no}, '${designation}', '${gender}')`;

  connection.query(query, (err, rows, fields)=>{
  	if(err) {
  		throw err
  		console.log(err);
  	}
  	else{
  		res.json(200);
  	}
  })
})

router.put('/update/:id', cros(), function(req, res, next) {
 var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var age = req.body.age;
  var ph_no = req.body.ph_no;
  var designation = req.body.designation;
  var gender = req.body.gender;
  console.log(firstName, lastName, age, ph_no, designation, gender);
  var id = req.params.id;
  var query = `UPDATE employee_table SET firstName = '${firstName}', lastName = '${lastName}', age = ${age}, ph_no = ${ph_no}, designation = '${designation}', gender = '${gender}' WHERE id = ${id}`;

  connection.query(query, (err, rows, fields)=>{
  	if(err) {
  		throw err
  		console.log(err);
  	}
  	else{
  		res.json(200);
  	}
  })
})

module.exports = router;
