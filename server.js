// server.js

const express = require('express'); // Add the express framework
const app = express();

const bodyParser = require('body-parser'); // Add the body-parser tool
app.use(bodyParser.json());              // Add support for JSON encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Add support for URL encoded bodies

const pug = require('pug'); // Add pug

//Create Database Connection
const pgp = require('pg-promise')();


//db config
const dbConfig = {
	host: '192.168.50.130',
<<<<<<< HEAD
	port: 1000,
=======
	port: 5432,
>>>>>>> 1cf42ba19de766a482f40a058592e029516b8b15
	database: 'traffic_db',
	user: 'admin',
	password: 'Appl3'
};

let db = pgp(dbConfig);


//sets pug as view engine
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/'));

<<<<<<< HEAD




app.get('/', function(req, res) {
	res.render('pages/home',{
	});
});





const hostname = '192.168.50.130';
const port = 2048;
app.listen(port, hostname);
=======
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
>>>>>>> 1cf42ba19de766a482f40a058592e029516b8b15
console.log('listening on port ' + port);

