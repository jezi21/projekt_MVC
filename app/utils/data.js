const fs = require('fs');
const getEnv = require('../utils/get_env');

const env = getEnv();
console.log(env);

const USERS_PATH = `./data/${env.users_database}`;
const EVENTS_PATH = `./data/${env.events_database}`;
console.log(USERS_PATH);
console.log(EVENTS_PATH);

const loadUsers = () => {
  // check if the file exists
  if (!fs.existsSync(USERS_PATH)) {
    return {};
  }
  const users = JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));
  return users;
}

const loadEvents = () => {
  // check if the file exists
  if (!fs.existsSync(EVENTS_PATH)) {
    return {};
  }
  const events = JSON.parse(fs.readFileSync(EVENTS_PATH, 'utf8'));
  return events;
}

const saveUsers = (users) => {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

const saveEvents = (events) => {
  fs.writeFileSync(EVENTS_PATH, JSON.stringify(events, null, 2));
}

module.exports = {
  loadUsers,
  loadEvents,
  saveUsers,
  saveEvents
};