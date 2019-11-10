// server.js

const express = require('express'); // Add the express framework
let app = express();

const bodyParser = require('body-parser'); // Add the body-parser tool
app.use(bodyParser.json());              // Add support for JSON encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Add support for URL encoded bodies

const pug = require('pug'); // Add pug

//Create Database Connection
const pgp = require('pg-promise')();

//db config
const dbConfig = {
	host: '192.168.50.130',
	port: 5432,
	database: 'traffic_db',
	user: 'admin',
	password: 'Appl3'
};

let db = pqp(dbConfig);


//sets pug as view engine
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/'));

// home page
app.get('/home', function(req, res) {
	var query = ''; // select all locations and their latest reading
	db.any(query)
		.then(function (location_status) {
			res.render('pages/home', {
				page_title: 'Home',
				data: location_status
			})
		})
		.catch(function (err) {
			console.log('error '+ err);
			res.render('pages/home', {
				page_title: 'Home',
				data: '',
			})
		})
});

// location page 
app.get('/location', function(req, res) {
	res.render('pages/location',{
		page_title:"Location Name"
	});
});

var port = 2048;
app.listen(port);
console.log('listening on port ' + port);