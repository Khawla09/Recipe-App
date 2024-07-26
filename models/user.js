const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 10,
  },
  // recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipe" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
//we can't use arrow funct in mongoose
// userSchema.method.sayHi = function () {
//   console.log(`Hi my name is, ${this.username}`);
// };
const User = mongoose.model("User", userSchema);
module.exports = User;
