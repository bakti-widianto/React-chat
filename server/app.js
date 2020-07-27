var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/chatdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('connected to database'))
    .catch((err) => console.log('Error'))

var indexRouter = require('./routes/index');
var chatRouter = require('./routes/chat');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/chat', chatRouter);

module.exports = app;
