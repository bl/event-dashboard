const { Pool } = require('pg');
const Sequelize = require('sequelize');

// pool used for services interacting with bare metal postgres
const pool = Pool({
  database: 'eventdb'
});

const sequelize = new Sequelize({
  database: 'eventdb',
  host: 'localhost',
  dialect: 'postgres'
});

const AccessToken = sequelize.define('access_token', {
  id: {
    type: Sequelize.TEXT,
    unique: true,
    primaryKey: true,
  },
  tokens: {
    type: Sequelize.JSONB,
  },
  expiry_date: {
    type: Sequelize.DATE,
    // TODO: set default expiry to 30 days if none provided
    //defaultValue: Sequelize.NOW
  },
  token_type: {
    type: Sequelize.TEXT
  }
});

function init(opts) {
  // create Sequelize databases
  AccessToken.sync(opts);
}

function getOauthCredentials(query) {
  return AccessToken.findOne({
    where: query
  })
    .then(accessToken => accessToken && accessToken.tokens)
}

function setOauthCredentials({id, ...params}) {
  // upsert failing due to following pg version issue:
  // https://github.com/sequelize/sequelize/issues/8043
  return AccessToken.findCreateFind({
    where: {id: id},
    defaults: params,
  })
    .then(([accessToken, created]) => {
      if (created) {
        return;
      }
      accessToken.update(params);
    })
    .catch(err => console.log(err));
}

module.exports = {
  pool: pool,
  getOauthCredentials: getOauthCredentials,
  setOauthCredentials: setOauthCredentials,
  init: init,
};
