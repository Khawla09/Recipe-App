require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const conn = require("./db/conn");
const userData = require("./db/userData");
const recipeData = require("./db/recipeData");
const commentData = require("./db/commentData");
const User = require("./models/user");
const Recipe = require("./models/recipe");
const Comment = require("./models/comment");
//Routes
const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");
const commentRoutes = require("./routes/comments");
conn();
app.use(express.json());
//View Engine
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
//middleware
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comments", commentRoutes);
//get home page
app.get("/", (req, res) => {
  res.send("Home Page");
});

//users DataBase
app.get("/users/userData", async (req, res) => {
  try {
    // await User.deleteMany({});
    await User.create(userData);
    res.json(userData);
  } catch (error) {
    console.log("something went wrong loading seed " + error.message);
  }
});
//recipes DataBase
app.get("/recipes/recipeData", async (req, res) => {
  try {
    await Recipe.deleteMany({});
    await Recipe.create(recipeData);
    res.json(recipeData);
  } catch (error) {
    console.log("something went wrong loading seed " + error.message);
  }
});
//Comments DataBase
app.get("/comments/commentData", async (req, res) => {
  try {
    await Comment.deleteMany({});
    await Comment.create(commentData);
    res.json(commentData);
  } catch (error) {
    console.log("something went wrong loading Comments " + error.message);
  }
});

//listen to port
app.listen(PORT, () => {
  console.log("Connected successfuly on port: " + PORT);
});
