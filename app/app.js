const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');
const errorRoutes = require("./routes/errors");
const homeRouter = require('./routes/home');


const PORT = 3000;
const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');


app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));


app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/', homeRouter);
app.use(errorRoutes); 


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});