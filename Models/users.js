const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://saurabhkolarkar100:Saurk@cluster0.p5btpbm.mongodb.net/?retryWrites=true&w=majority"
);
const connect = mongoose.Collection;

mongoose.connection.on("error", (err) => {
  console.log("connection failed");
});

mongoose.connection.on("connected", (connected) => {
  console.log("connected with database....");
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // String is shorthand for {type: String}
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match:
      /[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
