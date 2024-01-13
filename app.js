const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const fs = require('fs');
const {checkCurrentUser} = require("./middleware/authMiddleware");
const path = require("path");

const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());

//routes
app.get('*', checkCurrentUser); //for all get requests
app.get('/', (req, res) => {
  res.render('home'); //home page
});
app.use(authRoutes);


const PORT = 8081;

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//create server
app.listen(PORT, function (error) {
  if (error) {
    console.log('Something went wrong', error);
  } else {
    console.log('Server is listening on port ' + PORT);
  }
});

