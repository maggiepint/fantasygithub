const express = require('express');
const bodyParser = require('body-parser');
const GitHubApi = require("github");
const aggregator = require('./statisticAggregator.js');

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Fantasy GitHub'})
});

app.post('/', function (req, res) {
  var requestDto = {
      repos: req.body.repo,
      token: req.body.token,
      startDate: req.body.startDate,
      endDate: req.body.endDate
  };
  const agg= new aggregator(req.body.token, req.body.repo, req.body.startDate, req.body.endDate);
  agg.getAllCommits().then(() => {
      res.render('summary', { repos: agg.repos, startDate: req.body.startDate, endDate: req.body.endDate });
  })

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});