const User = require('../models/users');
const Events = require('../models/events');

const isLogged = require('../utils/is_logged.js');


const getLoginOrRegister = (req, res) => {
  res.render('login', { title: 'Login' , isLogged: isLogged(req)});
};

const postLogin = (req, res) => {
  const { username, password } = req.body;
  if(User.login(username, password)){
    req.session.username = username;
    res.redirect('/users/profile');
  }
  else{
    res.redirect('/users/login');
  }
}

const postRegister = (req, res) => {
  const { username, password, phone } = req.body;
  if(User.register(username, password, phone)){
    req.session.username = username;
    res.redirect('/users/profile');
  }
  else{
    res.redirect('/users/login');
  }
}

const getLogout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}

const getProfile = (req, res) => {
  if (!isLogged(req)){
    res.redirect('/users/login');
    return;
  }

  const user = User.getUser(req.session.username);
 

  const userEvents = Events.getEvents(user.events);
  const interestedEvents = Events.getEvents(user.interests);
  res.render('profile', { title: user.username, user , isLogged: isLogged(req),user, userEvents, interestedEvents});
}

const getEditProfile = (req, res) => {
  const user = User.getUser(req.session.username);
  if (!user){
    res.redirect('/users/login');
    return;
  }
  res.render('edit-profile', { title: 'Edit Profile', user , isLogged: isLogged(req)});
}

const postEditProfile = (req, res) => {
  const user = User.getUser(req.session.username);
  if (!user){
    res.redirect('/users/login');
    return;
  }
  const data = req.body;
  User.editProfile(req.session.username, data);
  res.redirect('/users/profile');
}

module.exports = {
  getLoginOrRegister,
  postLogin,
  postRegister,
  getLogout,
  getProfile,
  getEditProfile,
  postEditProfile
};


