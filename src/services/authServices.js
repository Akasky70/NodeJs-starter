import Boom from "boom";
import bcrypt from "bcrypt-nodejs";
import {
  updateRefreshToken,
  generateAccessToken,
  generateRefreshToken
} from "../utils/tokensBuilder";
import * as userService from "../services/userService";

export function loginUser(userData) {
  return userService.getUserByEmail(userData.email).then(user => {
    if (!user) {
      throw { status: 404, statusMessage: "User not found" };
    }

    if (bcrypt.compareSync(userData.password, user.get("password"))) {
      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      // UPDATES REFRESH TOKEN IN DB
      userService.updateRefreshToken(user.id, refreshToken);

      const userData = {
        id: user.id,
        name: user.get("name"),
        email: user.get("email")
      };
      const token = {
        accessToken,
        refreshToken
      };

      return { token, userData };
    } else {
      throw { status: 403, statusMessage: "Password incorrect." };
    }
  });
}

export function authenticateRefreshToken(userData) {
  return userService
    .verifyRefreshToken(userData.id, userData.refreshToken)
    .then(count => {
      if (count == 1) {
        const newAccessToken = generateAccessToken(userData.id);
        const newRefreshToken = generateRefreshToken(userData.id);

        // UPDATES REFRESH TOKEN IN DB
        userService.updateRefreshToken(userData.id, newRefreshToken);
        return { newAccessToken, newRefreshToken, id: userData.id };
      } else {
        return { status: 404, message: "No User found" };
      }
    })
    .catch(err => {
      return err;
    });
}

export function logoutUser(user) {
  return userService.updateRefreshToken(user.id);
}
