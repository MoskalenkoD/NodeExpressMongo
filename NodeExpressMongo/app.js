// Full Documentation - https://docs.turbo360.co
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID });
const express = require('express');


const app = vertex.app(); // initialize app


// import routes
const index = require('./routes/index');
const api = require('./routes/api');

// set routes
app.use('/', index);
app.use('/api', api); // sample API Routes

module.exports = app;