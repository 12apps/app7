var express = require('express');
var router = express.Router();

// Request API access: http://www.yelp.com/developers/getting_started/api_access

var yelp = require("yelp").createClient({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* Get Yelp Info. */
router.get('/yelp', function(req, res) {
  yelpSearch(req.query.latlon, res);
});

function yelpSearch(latlon, res){
  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search({term: "food", ll: latlon }, function(error, data) {
    console.log(error);
    console.log(data);
    res.status(200).json(data)
  });
}



module.exports = router;
