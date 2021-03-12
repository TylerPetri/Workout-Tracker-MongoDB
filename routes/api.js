const db = require('../models')
const express = require('express')
const app = express()


module.exports = function () {
app.get("/api/workouts", (req, res) => {
    db.User.find({})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });
}