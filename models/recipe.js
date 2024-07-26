const mongoose = require("mongoose");
const { type } = require("os");
const ingredientSubSchema = new mongoose.Schema({
  paste: {
    type: [String],
    required: true,
  },
  filling: {
    type: [String],
  },
});
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: ingredientSubSchema,
    required: true,
    _id: false,
  },
  directions: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    immutable: true, //means we can't change this date
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },

  // imageUrl: { type: String },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  //address: {street: String, city: string, zipCode: number}
  //or make schema for address component and add name of const to address
});
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
