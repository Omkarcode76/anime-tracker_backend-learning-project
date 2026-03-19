import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: [4, "password must be atleast 4 charater long"],
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("User", userSchema);
