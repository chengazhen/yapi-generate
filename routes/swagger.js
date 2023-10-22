var express = require('express');
var router = express.Router();
var http  = require('../lib/http')

/* GET users listing. */
router.post('/', function(req, res, next) {
  http.get(req.body.url).then(_res => {
     res.send(_res.data)
  })
});

module.exports = router;
