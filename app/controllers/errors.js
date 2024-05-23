const isLogged = require('../utils/is_logged.js');

function getNotFoundPage  (req, res) {
  res.status(404).render('not-found', { title: '404 - Page Not Found', isLogged: isLogged(req)});
};

function get401Page  (req, res) {
  res.status(401).render('401', { title: '401 - Unauthorized', isLogged: isLogged(req)});
}


module.exports = {
  getNotFoundPage,
  get401Page

};
