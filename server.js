const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const app = express()

const PORT = process.env.PORT || 3000

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    userNewUrlParser: true,
    useFindAndModify: false,
});

// app.use(require('./routes/api.js'))
// app.use(require('./routes/view.js'))

const db = require('./models')

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

app.put('/api/workouts/:id', ({ params },res ) => {
    db.Workout.updateOne(
        {
            _id: ObjectId(params.id)
        }, 
        {
            $set: {
                data: ''
            }
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
        )
})


app.listen( PORT, () => {
    console.log(`Listening on port ${PORT}`)
})