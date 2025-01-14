var express = require('express');
var router = express.Router();
const crtlMain = require('../controllers/main');

/* GET home page. Changed '/' to '/index' to fix a 404 error*/
router.get('/index', crtlMain.index);

module.exports = router;
