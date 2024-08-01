import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"; //jwt is a bearer token for the client connection to the server side
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true, // to make the field searchable
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"], // custom error message
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// middleware - that runs before saving the data
userSchema.pre("save", async function (next) {
  //i n arrow func this keyword doesnt work
  if (!this.isModified("password")) return next();
  // hash the password only when the password is modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// custom methods

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    //payload
    {
      _id: this._id, //from mongodb
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    // token
    process.env.ACCESS_TOKEN_SECRET,
    // expiry object
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      //payload
      _id: this._id, //from mongodb
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
