const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const BlogSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  createdByUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isHidden: { type: Boolean, default: false },
});

// Virtual for post's URL
BlogSchema.virtual("url").get(function () {
  return `/blog/${this._id}`;
});

BlogSchema.virtual("createdDate_formatted").get(function () {
  return DateTime.fromJSDate(this.createdDate).toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
});

module.exports = mongoose.model("Blog", BlogSchema);
