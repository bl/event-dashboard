var oauth = require('./oauthService');

function calendarService() {
  let cs = oauth.google.calendar('v3');

  function calendarList() {
    let params = {};
    return new Promise((resolve, reject) => {
      cs.calendarList.list(params, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      })
    })
  }

  return {
    calendarList: calendarList
  };
}

module.exports = calendarService();
