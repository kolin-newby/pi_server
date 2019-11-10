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
	port: 1000,
	database: 'traffic_db',
	user: 'admin',
	password: 'Appl3'
};

let db = pgp(dbConfig);


//sets pug as view engine
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/'));





app.get('/', function(req, res) {
	res.render('pages/home',{
	});
});





const hostname = '192.168.50.130';
const port = 2048;
app.listen(port, hostname);
console.log('listening on port ' + port);

