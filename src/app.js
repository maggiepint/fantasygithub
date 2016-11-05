const express = require('express');
const bodyParser = require('body-parser');
var GitHubApi = require("github");

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Fantasy GitHub'})
});

app.post('/', function (req, res) {
  var repos = req.body.repo;
  var token = req.body.token;
});

app.listen(3000, function () {
  console.log('Example app listening on http://localhost:3000')
});
