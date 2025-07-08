import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const userCollections = "users";
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  last_name: {
    type: String,
    age: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    required: false,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: "user" },
});

const userModel = mongoose.model(userCollections, userSchema);

export default userModel;
