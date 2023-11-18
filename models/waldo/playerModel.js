const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PlayerSchema = new Schema({
  player: { type: String, required: true, set: (value) => value.toLowerCase() },
  score: { type: Number, required: true },
  map: { type: String },
  createdDate: { type: Date, default: Date.now },
});

// Virtual for player's URL
PlayerSchema.virtual("url").get(function () {
  return `/player/${this._id}`;
});

PlayerSchema.virtual("joinDate_formatted").get(function () {
  return DateTime.fromJSDate(this.createdDate).toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
});

module.exports = mongoose.model("Player", PlayerSchema);
