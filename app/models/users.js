const loadUsers = require('../utils/data').loadUsers;
const saveUsers = require('../utils/data').saveUsers;


const users = loadUsers();


class User{
  constructor(username, password, phone=null, events=[], interests=[]){
    this.username = username;
    this.password = password;
    this.phone = phone;
    this.events = events;
    this.interests = interests;
  }

  static login(username, password){
    
    return(users[username] && users[username].password === password)
  }

  static register(username, password, phone=null){
    if(users[username]){
      return false;
    }
    users[username] = new User(username, password, phone);
    saveUsers(users);
    return true;
  }

  static getUser(username){
    const user = users[username];
    return new User(user.username, user.password, user.phone, user.events, user.interests);
  }

  static addEvent(username, eventId){
    users[username].events.push(eventId);
    saveUsers(users);
  }

  static removeEvent(username, eventId){
    users[username].events = users[username].events.filter(e => e !== eventId);
    saveUsers(users);
  }

  static addInterest(username, eventId){
    users[username].interests.push(eventId);
    saveUsers(users);
  }

  static removeInterest(username, eventId){
    users[username].interests = users[username].interests.filter(e => e !== eventId);
    saveUsers(users);
  }

  static editProfile(username, data){
    users[username].phone = data.phone;
    users[username].password = data.password;
    saveUsers(users);
  }
  
  static getAll(){
    return users;
  }
}

module.exports = User;