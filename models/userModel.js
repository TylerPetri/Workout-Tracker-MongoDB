const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
      {
        type: {
            type: String,
            trim: true
        },
        name: {
            type: String,
            trim: true
        },
        duration: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        },
      }
    ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
