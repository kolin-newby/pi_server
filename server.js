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
const QUIET_CUTOFF = 100;
const BUSY_CUTOFF = 200;

// home page
app.get('/', function(req, res) {
	// select all locations and their latest reading
	var query = "SELECT DISTINCT ON (l.loc_id) l.loc_id AS id, l.loc_desc AS name, ";
	query += "l.loc_hours AS hours, d.volume_db AS volume, d.time AS time ";
	query += "FROM locations l LEFT JOIN data d ON d.loc_id = l.loc_id ";
	query += "ORDER BY l.loc_id, d.time DESC;";
	console.log(query);
	db.any(query)
		.then(function (location_status) {
			console.log(location_status);
			res.render('pages/home', {
				page_title: 'Home',
				data: location_status,
				display_location: '',
				display_data: ''
			})
		})
		.catch(function (err) {
			console.log(err);
			res.render('pages/home', {
				page_title: 'Home',
				data: '',
				display_location: '',
				display_data: ''
			})
		})
});

// form to select a location to view
app.post('/select_location', function(req, res) {
	var query = "SELECT DISTINCT ON (l.loc_id) l.loc_id AS id, l.loc_desc AS name, ";
	query += "l.loc_hours AS hours, d.volume_db AS volume, d.time AS time ";
	query += "FROM locations l LEFT JOIN data d ON d.loc_id = l.loc_id ";
	query += "ORDER BY l.loc_id, d.time DESC;";
	var location_to_view = req.body.location;
	console.log("Location: ", location_to_view);
	var location_query = "SELECT loc_id AS id, loc_desc AS name, loc_hours AS hours ";
	location_query += "FROM locations WHERE loc_id = " + location_to_view + ";";
	var data_query = "SELECT d.volume_db AS volume, d.time FROM data d ";
	data_query += "FULL JOIN locations l ON d.loc_id = " + location_to_view;
	data_query += " WHERE d.time > (NOW() - interval '3 weeks') ";
	data_query += "ORDER BY d.time DESC;";
	db.task('get-everything', task => {
		return task.batch([
			task.any(query),
			task.any(location_query),
			task.any(data_query)
		]);
	})
	.then(info => {
		res.render('pages/home', {
			page_title: 'Home',
			data: info[0],
			display_location: info[1],
			display_data: info[2]
		})
	})
	.catch(err => {
		console.log(err);
		res.render('pages/home',{
			page_title: 'Home',
			data: '',
			display_location: '',
			display_data: ''
		})
	})
});

var port = 2048;
app.listen(port);
console.log('listening on port ' + port);