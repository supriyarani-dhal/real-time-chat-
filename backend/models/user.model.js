import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

//this middleware encrypts the password before(pre) saving(save) userSchema on mongoDB
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  //generate a salt and hash on
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //store hash on DB
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
