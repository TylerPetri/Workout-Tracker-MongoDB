const router = require("express").Router();
const mongoose = require("mongoose");
const { Workout } = require("../models/index.js");

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ])
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/api/workouts/range', ( req, res ) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ])
  .sort({day: -1})
  .limit(7)
  .sort({day: 1})
  .then((dbUser) => {
    res.json(dbUser);
  })
  .catch((err) => {
    res.json(err);
  });
})

router.post("/api/workouts", (req, res) => {
    Workout
      .create({})
      .then((workoutDB) => {
        res.json(workoutDB);
      })
      .catch((err) => {
        res.json(err);
      });
  });

router.put("/api/workouts/:id", (req, res) => {
  const data = req.body;

  Workout.updateOne(
    {
      _id: mongoose.Types.ObjectId(req.params.id),
    },
    {
      $push: {
        exercises: data,
      },
    },
    (error, edited) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

module.exports = router