const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" field must be filled in'],
    minlength: [2, 'The minimum length of the "name" field is 2'],
    maxlength: [30, 'The maximum length of the "name" field is 30'],
  },
  weather: {
    type: String,
    required: [true, 'The "weather" field must be filled in'],
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: [true, 'The "imageUrl" field must be filled in'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Invalid URL format",
    },
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "User",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'The "owner" field must be filled in'],
    ref: "User",
  },
  createdAt: {
  type: Date,
  default: Date.now,
},
});


module.exports = mongoose.model("ClothingItem", clothingItemSchema);