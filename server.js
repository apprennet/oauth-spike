import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import oauthserver from 'oauth2-server';
import cors from 'cors';

import model from './model';

var app = express();

app.use(cors());

app.oauth = oauthserver({
  model: require('./model'),
  grants: ['password'],
  debug: true
});

// static files
app.use(express.static('public'));

// Body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const secret = 'shhh';

// Routes
app.all('/oauth/token', app.oauth.grant());

app.get('/', (req, res) => {
  res.send('working');
});

app.get('/protected', app.oauth.authorise(), (req, res) => {
  res.send('protected resource');
});

app.listen(8082);
