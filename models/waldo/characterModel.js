const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  character: { type: String, required: true },
  posX: { type: [Number], required: true },
  posY: { type: [Number], required: true },
  map: { type: String, required: true },
});

// Virtual for character's URL
CharacterSchema.virtual("url").get(function () {
  return `/character/${this._id}`;
});

module.exports = mongoose.model("Character", CharacterSchema);
