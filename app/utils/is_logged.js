const isLogged = (req) => {
  return req.session.username ? true : false;
}

module.exports = isLogged;