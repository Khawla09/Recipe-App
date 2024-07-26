const express = require("express");
const router = express.Router();
const User = require("../models/user");
//index - GET
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ msg: "Whoops there is a problem getting data" });
    console.error(error.msg);
  }
});
//show - GET
router.get("/:id", async (req, res) => {
  const oneUser = await User.findById(req.params.id);
  res.json(oneUser);
  // User.sayHi();
});
//create - POST
router.post("/", async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});
//Update PuT/PATCH
router.put("/:id", async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
  res.json(updateUser);
});

//Destroy - delete
router.delete("/:id", async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  res.json(deleteUser);
});

module.exports = router;
