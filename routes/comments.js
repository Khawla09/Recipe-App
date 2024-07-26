const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
//GET -index-
router.get("/", async (req, res) => {
  try {
    const allComments = await Comment.find({});
    res.json(allComments);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Oops There is a problem getting comment's Data" });
    console.error(error.msg);
  }
  //post new cpmment
  router.post("/", async (req, res) => {
    const newComment = await Comment.create(req.body);
    res.json(newComment);
  });
  //find by id
  router
    .route("/:id")
    .get(async (req, res) => {
      const oneComment = await Comment.findById(req.params.id);
      res.json(oneComment);
    }) //update
    .put(async (req, res) => {
      const updateComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.json(updateComment);
    })
    .delete(async (req, res) => {
      const deleteComment = await Comment.findByIdAndDelete(req.params.id);
      res.json(deleteComment);
    });
});
module.exports = router;
