const express = require('express')
const app = express()
const port = 3000;
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload");

var session = require('express-session');
var flash = require('connect-flash');
const cookieParser = require('cookie-parser')

app.use(fileUpload({useTempFiles: true}));
// to success msg
app.use(session({
  secret:'secret',
  cookie:{maxAge:60000},
  resave:false,
  saveUninitialized:false,
}));

app.use(flash());

//cookies 

app.use(cookieParser())

const web = require('./routes/web')
//to get data in array
app.use(express.urlencoded({ extended: true }));
//console.log(express);
app.set('view engine', 'ejs')

//connect database.

connectdb();


//route localhost:3000
app.use('/',web)

// static files
app.use(express.static('public'))



//server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })