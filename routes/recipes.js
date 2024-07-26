const express = require("express");
const router = express();
const Recipe = require("../models/recipe");

//
router.get("/", async (req, res) => {
  try {
    const allRecipes = await Recipe.find({});
    res.json(allRecipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Whoops there is a problem getting data!" });
    console.error(error.message);
  }
});
//create - POST
router.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).send(newRecipe);
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error
      res.status(400).send({ error: "Recipe already exists" });
    } else {
      res.status(400).send({ error: error.message });
    }
  }
});
//show GET with id
router
  .route("/:id")
  .get(async (req, res) => {
    const oneRecipe = await Recipe.findById(req.params.id);
    res.json(oneRecipe);
  }) //PUT update
  .put(async (req, res) => {
    const updateRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json(updateRecipe);
  })
  .delete(async (req, res) => {
    const deleteRecipe = await Recipe.findByIdAndDelete(req.params.id);
    res.json(deleteRecipe);
  });

module.exports = router;
