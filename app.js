const express = require('express');
const cors = require('cors');

const appRouter = require('./src/routes/app.routes');

const port = 3001;

let app = express();

const dbConnection = require('./src/db/connection');

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// define application routes here

app.use('/api/v1/money-manager', appRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next({ statusCode: 404, status: 'No such route found!' });
});

// Define default error handler
// https://expressjs.com/en/guide/error-handling.html
app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Something went wrong!';
  res.status(err.statusCode).json(err);
});

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
  // After starting the server try connection to db. If db connection fails the express server will gracefully shutdown
  // by using process.exit(1)
  dbConnection();
});
