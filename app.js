require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import routes
const wordsRouter = require('./routes/words');

// initialize
const app = express();

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

// The urlencoded method within body-parser tells body-parser to extract data
// from the <form> element and add them to the body property in the request object.
app.use(bodyParser.urlencoded({ extended: true }));

// tell Express it should accept JSON
app.use(express.json());

// use routes
app.use('/words', wordsRouter);

app.get('/', (req, res) => {
  res.send('Home');
});

const port = process.env.PORT || 6969;

// listen
app.listen(port, () =>
  console.log(`your dope app is running at http://localhost:${port}`)
);
