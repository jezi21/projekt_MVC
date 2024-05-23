const isLogged = require('../utils/is_logged.js');

const getHome = (req, res) => {
  res.render('homepage', { title: 'Home' ,isLogged: isLogged(req)});
};

const getAbout = (req, res) => {
  res.render('about', { title: 'About',layaot: 'layout', isLogged: isLogged(req)});
};

module.exports = {
  getHome,
  getAbout
};