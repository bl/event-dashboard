var oauth = require('./oauthService');

function calendarService() {
  let cs = oauth.google.calendar('v3');

  function calendarList() {
    return promiseWrapper(cs.calendarList.list, {});
  }

  function calendar(calendarId) {
    return promiseWrapper(cs.calendars.get, {calendarId: calendarId});
  }

  function events(calendarId) {
    return promiseWrapper(cs.events.list, {calendarId: calendarId});
  }

  function promiseWrapper(serviceCall, params) {
    return new Promise((resolve, reject) => {
      serviceCall(params, (err, res) => {
        if (err) {
          return reject(err);
        }

        resolve(res);
      });
    });
  }

  return {
    calendarList: calendarList,
    calendar: calendar,
    events: events,
  };
}

module.exports = calendarService();
