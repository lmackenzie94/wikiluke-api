import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// import routes
import wordsRouter from './routes/words.js';
import quotesRouter from './routes/quotes.js';
import adviceRouter from './routes/advice.js';
import learningsRouter from './routes/learnings.js';
import highlightsRouter from './routes/highlights.js';
import randomRouter from './routes/random.js';

// swagger
import { setupSwagger } from './swagger.js';

// auth
import { apiKeyMiddleware } from './auth.js';

// initialize
const app = express();

// enable cors
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION_STRING);
const db = mongoose.connection;
db.once('open', () => console.log('connected to database'));
db.on('error', error => console.error(error));

app.use(express.urlencoded({ extended: true }));

// tell Express it should accept JSON
app.use(express.json());

// swagger
setupSwagger(app);

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

// Home
app.get('/', (_, res) => {
  res.send(`Home | wikiluke API`);
});

// 404
app.use((_, res) => {
  res.status(404).send('404 Not Found');
});

const PORT = process.env.PORT || 1234;

// listen
app.listen(PORT, () =>
  console.log(`Your dope API is running at http://localhost:${PORT}`)
);
