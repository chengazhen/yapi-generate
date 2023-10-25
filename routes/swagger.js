var express = require('express');
var router = express.Router();
var http = require('../lib/http')

/* GET users listing. */
router.post('/', async function (req, res, next) {
  try {
    const _res = await http.get(req.body.url)
    res.send(_res.data)
  } catch (error) {
    res.status(500).send(error)
  }
});

module.exports = router;
