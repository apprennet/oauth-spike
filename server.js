import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import oauthserver from 'oauth2-server';

// OAuth model provided for node-oauth2-server API https://github.com/oauthjs/node-oauth2-server/tree/v2.2.1#model-specification
import model from './model';

var app = express();

// node-oauth2-server server options https://github.com/oauthjs/node-oauth2-server/tree/v2.2.1#quick-start
app.oauth = oauthserver({
  model: model,
  grants: ['password'],
  debug: true,
  accessTokenLifetime: 86400
});

// static files
app.use(express.static('public'));

// Body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.all('/oauth/access-token', app.oauth.grant());

app.get('/test', (req, res) => {
  res.send('working');
});

app.get('/protected', app.oauth.authorise(), (req, res) => {
  console.log(req.get('Authorization'))
  res.send('you can see the protected resource');
});

// 404s
app.use((req, res) => {
  res.status(404).send('404 :(')
});

// 500s
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('500 :( '  + err.stack);
});

app.listen(8082);
