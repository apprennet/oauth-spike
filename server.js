import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import methodOverride from 'method-override';
import exphbs from 'express-handlebars';

var app = express();

// static files
app.use(express.static('public'));

// Body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie parsing
app.use(cookieParser('asdf'));

// CSRF
app.use(csrf({ cookie: true }));
app.use((req, res, next) => {
  res.locals.csrf = req.csrfToken();
  next();
});

// Request methods
app.use(methodOverride('_method'))

// View engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
  res.send('working');
});

app.get('/new', (req, res) => {
  res.cookie('test', 'cats', { signed: true });
  res.render('posts/new', {csrfToken: res.locals.csrf});
});

app.post('/new', (req, res) => {
  res.render('posts/new', {csrfToken: res.locals.csrf});
});

// 404s
app.use((req, res) => {
  res.status(404).send('404 :(');
});

// 500s
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('500 :('  + err.stack);
});

app.listen(8082);
