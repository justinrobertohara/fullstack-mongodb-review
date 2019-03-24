const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const router = require('./router.js');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);
app.use(express.static(path.join(__dirname, '/../client/dist')));

const port = 3000;

// add middleware

app.listen(port, () => console.log(`Listening on port ${port}`));
