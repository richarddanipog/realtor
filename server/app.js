const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apartmentsRouter = require('./routes/apartments');
const citiesRouter = require('./routes/cities');
const countriesRouter = require('./routes/countries');
const logInRouter = require('./routes/log-in');
const signUpRouter = require('./routes/signup');


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/users', usersRouter);
app.use('/apartments', apartmentsRouter);
app.use('/cities',citiesRouter);
app.use('/countries',countriesRouter)
app.use('/login', logInRouter);
app.use('/signup', signUpRouter);

const env = process.env.NODE_ENV || 'development';
// Serve react app in production mode
if (env === 'production') {
    app.use(express.static(path.join(__dirname,"client/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", 'index.html'));
    });
}


app.listen(process.env.PORT || 80);
module.exports = app;