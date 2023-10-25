const express = require('express');
const router = express.Router();
const http = require('../lib/http')
const converter = require('swagger2openapi');

/* GET users listing. */
router.post('/', async function (req, res, next) {
  try {
    const _res = await http.get(req.body.url)
    converter.convert(_res.data, {}, (err, options) => {
      if (err) {
        return;
      }
      res.send(options.openapi)
    })
  } catch (error) {
    res.status(500).send(error)
  }
});

module.exports = router;
