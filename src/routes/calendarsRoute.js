const express = require('express');
const router = express.Router();
const calendarService = require('../calendarService');

router.get('/:id', (req, res, next) => {
  calendarService.calendar(req.params.id)
    .then((calendar) => {
      res.send(calendar);
    });
});

router.get('/:id/events', (req, res, next) => {
  calendarService.events(req.params.id)
    .then((events) => {
      res.send(events);
    });
});

module.exports = router;
