const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const menuRouter = require('./routes/menu');
const sectionsRouter = require('./routes/sections');
const itemsRouter = require('./routes/items');
const modifiersRouter = require('./routes/modifiers');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/menu', menuRouter);
app.use('/sections', sectionsRouter);
app.use('/items', itemsRouter);
app.use('/modifiers', modifiersRouter);

module.exports = app;
