import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//static register method
userSchema.statics.registerUser = async function (email, password) {

  //validation
  if(!fullName || !username || !email || !password) {
    throw Error('All fields must be filled')
  }

  if(!validator,isEmail(email)) {
    throw Error('email is not valid')
  }

  if(!validator.isStrongPassword(password)){
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if(exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

export const User = mongoose.model("User", userSchema);
