var express = require('express');
var router = express.Router();
const converter = require('swagger2openapi');
const axios = require('../lib/http.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res, next) {
  axios.get('http://127.0.0.1:4523/export/openapi?projectId=1254871&specialPurpose=openapi-generator').then(response => {
    converter.convert(response.data, {}, (err, options) => {
      if (err) {
        return;
      }
      res.send({
        data: options
      })
    })
  })
});




module.exports = router;
