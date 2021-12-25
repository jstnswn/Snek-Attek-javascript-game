const express = require('express');
const path = require('path');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
const scoresRoute = require('./routes/scores');
const usersRoute = require('./routes/users');

const app = express();

// const indexRoutes = require('./routes/')

app.set('view engine', 'pug');
// app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRoutes);

app.get('/', (req, res) => {
    res.render('index', {})
});

app.use('/scores', scoresRoute);
app.use('/users', usersRoute);


// Catch unhandled requests and forward to error handler
app.use((req, res, next) => {
    const err = new Error(`The request page couldn't be found.`);
    err.status = 404;
    next(err);
});

// Log error handler
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        //TODO
    } else {
        console.error(err);
    }
    next(err);
});

// 404 error handler
app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404);
        res.render('page-not-found', {
            title: 'Page Not Found',
        });
    } else {
        next(err);
    }
});

// Generic error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = process.env.NODE_ENV === 'production';
    console.log(err)
    res.render('error', {
        title: 'Server Error',
        message: isProduction ? null : err.message,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
