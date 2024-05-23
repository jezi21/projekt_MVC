const { Console } = require('console');
const fs = require('fs');

// from env.json

getEnv = () => {
 
  const env = JSON.parse(fs.readFileSync('./env.json', 'utf8'));
  return env;
}

module.exports = getEnv;
