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
	host: 'localhost',
	port: 5432,
	database: 'traffic_db',
	user: 'postgres',
	password: 'Appl3'
};

let db = pgp(dbConfig);

//sets pug as view engine
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/'));

//declare constants
const REFRESH_INTERVAL = "120 minutes";

// home page
app.get('/', function(req, res) {
	//var query = 'SELECT loc_id AS name FROM locations;';
	// select all locations and their latest reading
	var query = "SELECT DISTINCT ON (l.loc_desc) l.loc_desc AS name, ";
	query += "l.hours AS hours, d.volume_db AS volume ";
	query += "FROM locations l LEFT JOIN data d ON d.loc_id = l.loc_id ";
	query += "WHERE d.time BETWEEN (NOW() - interval '" + REFRESH_INTERVAL + "') AND NOW() ";
	query += "ORDER BY l.loc_desc, d.time DESC;";
	console.log(query);
	db.any(query)
		.then(function (location_status) {
			res.render('pages/home', {
				page_title: 'Home',
				data: location_status
			})
		})
		.catch(function (err) {
			console.log(err);
			res.render('pages/home', {
				page_title: 'Home',
				data: ''
			})
		})
});

// form to select a location to view
app.post('/select_location', function(req, res) {
	var location_to_view = req.body.location;
	res.render('pages/location', {
		page_title: location_to_view,
		location: location_to_view
	});
});

// location page
app.get('/location', function(req, res) {
	res.render('pages/location',{
		page_title: location,
		location: location
	});
});

var port = 2048;
app.listen(port);
console.log('listening on port ' + port);