const express = require('express');
const { json, urlencoded } = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(json());
app.use(urlencoded({ extended: true }));


module.exports = app;

