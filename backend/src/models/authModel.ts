
import mongoose from "mongoose";
import validator from 'validator'

const UserSchema = new mongoose.Schema({

  email: {
    type: String, 
    required: true, 
    unique: true,
    validate:[validator.isEmail,"Please Enter a valid Email"]
  },
  username: { 
    type: String, 
    required: true, 
    unique: true,
    minLength:[4,"Name should be atleast 4 characters"],
    maxLength:[30,"Name should not exceed 30 characters"],
  },
  password: { 
    type: String, 
    required: true,
    minLength:[6,"Password should be atleast 6 characters"],
    select:false
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

},{timestamps : true});

export default mongoose.model("User", UserSchema);