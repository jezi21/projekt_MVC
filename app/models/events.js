const e = require('express');

const loadEvents = require('../utils/data').loadEvents;
const saveEvents = require('../utils/data').saveEvents;

const events = loadEvents();
let idIndex = 0;
const createId = () => {
  // even when there will be multiple events created at the same time, the id will be unique
  idIndex += 1;
  if (idIndex > 100) {
    idIndex = 0;
  }
  return `${Date.now()}${idIndex}`
}

class Event {
  constructor(id,name, date, description, location, image_url="https://placehold.co/600x400") {
    this.id = id;
    this.name = name;
    this.date = date;
    this.description = description
    this.location = location;
    this.image_url = image_url;
    this.interested = 0;
  }
  
  static addEvent(name, date, description, location, image_url){
    const id = createId();
    events[id] = new Event(id, name, date, description, location, image_url);
    saveEvents(events);
    return id;
  }

  static getEvent(id){
    const event = events[id];
    return event;
  }

  static getAll(){
    return events;
  }

  static getEvents(ids){
    return ids.map(id => events[id]);
  }

  static search(text=null,location=null){
    let queryEvents = events;
    if (!text && !location){
      return queryEvents;
    }
    if (location && location!==""){
      queryEvents = Object.values(queryEvents).filter(event => event.location.toLowerCase().includes(location.toLowerCase()));
    }
    const search = text.toLowerCase();

    return Object.values(queryEvents).filter(event => event.name.toLowerCase().includes(search) || event.description.toLowerCase().includes(search));
    
  }
  static editEvent(id,data){

    if (!events[id]){
      return;
    }
    events[id].name = data.name;
    events[id].date = data.date;
    events[id].description = data.description;
    events[id].location = data.location;
    events[id].image_url = data.image_url;



    saveEvents(events);
  }
  static deleteEvent(id){
    delete events[id];
    saveEvents(events);
  }
  static addInterest(id){
    events[id].interested += 1;
    saveEvents(events);
  }
  static removeInterest(id){
    events[id].interested -= 1;
    saveEvents(events);
  }
}

module.exports = Event;