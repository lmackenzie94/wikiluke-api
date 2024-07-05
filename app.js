require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import routes
const wordsRouter = require('./routes/words');
const quotesRouter = require('./routes/quotes');
const adviceRouter = require('./routes/advice');
const learningsRouter = require('./routes/learnings');
const highlightsRouter = require('./routes/highlights');
const randomRouter = require('./routes/random');

// initialize
const app = express();

// enable cors
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to database'));

// The urlencoded method within body-parser tells body-parser to extract data
// from the <form> element and add them to the body property in the request object.
app.use(bodyParser.urlencoded({ extended: true }));

// tell Express it should accept JSON
app.use(express.json());

// Middleware to check the API key
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.API_KEY) {
    next(); // API key is correct, proceed to the next middleware/route handler
  } else {
    res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
};

// Use the API key middleware for POST requests
app.post('*', apiKeyMiddleware);
app.patch('*', apiKeyMiddleware);
app.delete('*', apiKeyMiddleware);

// use routes
app.use('/words', wordsRouter);
app.use('/quotes', quotesRouter);
app.use('/advice', adviceRouter);
app.use('/learnings', learningsRouter);
app.use('/highlights', highlightsRouter);
app.use('/random', randomRouter);

app.get('/', (req, res) => {
  res.send(`Home | wikiluke API`);
});

const port = process.env.PORT || 6969;

// listen
app.listen(port, () =>
  console.log(`Your dope app is running at http://localhost:${port}`)
);
