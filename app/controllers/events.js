const User = require('../models/users');
const Event = require('../models/events');
const isLogged = require('../utils/is_logged.js');


const getEvents = (req, res) => {
  const events = Event.getAll();
  
  res.render('events', { title: 'Events', events, isLogged: isLogged(req)});
};

const getSearchEvents = (req, res) => {
  const query  = req.query;
 


  const events = Event.search(query.search, query.location);
  res.render('events', { title: 'Events', events, isLogged: isLogged(req) });
};

const getAddEvent = (req, res) => {
  if (!isLogged(req)){
    res.redirect('/users/login');
    return;
  }

  res.render('create_event', { title: 'Add Event', isLogged: isLogged(req) });
};

const postAddEvent = (req, res) => {

  if (!isLogged(req)){
    res.redirect('/users/login');
    return;
  }

  const { name, date, description, location, image_url } = req.body;
  const eventId = Event.addEvent(name, date, description, location, image_url);
  User.addEvent(req.session.username,eventId );
  res.redirect('/events');
};

const getEditEvent = (req, res) => {
  if (!isLogged(req)){
    res.redirect('/users/login');
    return;
  }


  const event = Event.getEvent(req.params.id);
  res.render('edit_event', { title: 'Edit Event', event, isLogged: isLogged(req) });
};

const postEditEvent = (req, res) => {
  const id = req.params.id;
  if (!isLogged(req)){
    res.redirect('/users/login');
    return;
  }
  

  const {name, date, description, location, image_url } = req.body;
  const event = Event.getEvent(id);
  const user = User.getUser(req.session.username);
 
  if (!event || !user || !user.events.includes(id)){
    res.redirect('/401');
  }
  Event.editEvent(id,{ name, date, description, location, image_url });
  res.redirect('/events');
};

const postDeleteEvent = (req, res) => {
  const id = req.params.id;
  const event = Event.getEvent(id);

  if (!isLogged(req)){
    res.redirect('/users/login');
    return;
  }
 
  const user = User.getUser(req.session.username);
  if (!event || !user || !user.events.includes(id)){
    res.redirect('/401');
    return;
  }
  Event.deleteEvent(id);
  User.removeEvent(req.session.username, id);

  res.redirect('/events');
};

const postAddInterest = (req, res) => {
  

  const  id  = req.params.id;

  if (!isLogged(req)){
    res.redirect('/users/login');
    return;
  }

  const user = User.getUser(req.session.username);
  
  if (user.interests.includes(id)){
    res.redirect('/events');
    return;
  }


  Event.addInterest(id);
  User.addInterest(req.session.username, id);


  res.redirect('/events');
};

const postRemoveInterest = (req, res) => {
  const id  = req.params.id;
  if (!isLogged(req)){
    res.redirect('/users/login');
    return;
  }
  const user = User.getUser(req.session.username);
  if (!user){
    res.redirect('/users/login');
    return;
  }
  if (!user.interests.includes(id)){
    res.redirect('/events');
    return;
  }

  const event = Event.getEvent(id);

  User.removeInterest(user.username, id);
  Event.removeInterest(id);

  res.redirect('/events');
}

module.exports = {
  getEvents,
  getSearchEvents,
  getAddEvent,
  postAddEvent,
  getEditEvent,
  postEditEvent,
  postDeleteEvent,
  postAddInterest,
  postRemoveInterest
};