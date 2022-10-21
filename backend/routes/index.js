const express = require('express');
const router = require('express').Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

//!TEST ROUTE
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

  router.get("/csrf/restore", (req, res) => {
      const csrfToken = req.csrfToken();
      res.cookie("XSRF-TOKEN", csrfToken);
      res.status(200).json({
          'XSRF-Token': csrfToken
        });
    });


    app.use((_req, _res, next) => {
        const err = new Error("The requested resource couldn't be found.");
        err.title = "Resource Not Found";
        err.errors = ["The requested resource couldn't be found."];
        err.status = 404;
        next(err);
      });


      const { ValidationError } = require('sequelize');

// ...

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});



app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });
    module.exports = router;
