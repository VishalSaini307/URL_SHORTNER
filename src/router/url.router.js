const express = require('express');
const { handleGenrateShortURl, showGenrateURl , handleGenrateAnalytics } = require('../Controller/url.controller');
const router = express.Router();

router.post('/genrate', handleGenrateShortURl);
router.get('/visit/:shortId', showGenrateURl);
router.get('/analytics/:shortId', handleGenrateAnalytics )

module.exports = router
