const express = require('express');
const router = express.Router();

var calendars = require('../routes/calendarsRoute');

// TODO: add restriction for retrieving calendar data (ie on sessionId)
router.use(
  '/calendars',
  calendars
);

module.exports = router;
