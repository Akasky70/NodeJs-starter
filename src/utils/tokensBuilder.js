import uuid from "uuid/v4";
import User from "../models/user";
import jwt from "jsonwebtoken";

function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "60s"
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET_KEY);
}

export { generateAccessToken, generateRefreshToken };
