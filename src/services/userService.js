import Boom from "boom";
import User from "../models/user";
import bcrypt from "bcrypt-nodejs";

export function getAllUsers() {
  return User.fetchAll();
}

export function getUser(id) {
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound("User not found");
    }

    return user;
  });
}

export function getUserByEmail(email) {
  return new User({ email }).fetch().then(user => {
    return user;
  });
}

export function verifyRefreshToken(userId, refreshToken) {
  return User.where({ refresh_token: refreshToken, id: userId }).count();
}

export function createUser(user) {
  let hashPassword = bcrypt.hashSync(user.password);

  return new User({
    name: user.name,
    email: user.email,
    password: hashPassword,
    is_active: user.is_active
  })
    .save()
    .then(user => user.refresh());
}

export function updateUser(id, user) {
  let hashPassword = bcrypt.hashSync(user.password);

  return new User({ id })
    .save({
      name: user.name,
      email: user.email,
      password: hashPassword,
      is_active: user.is_active
    })
    .then(user => user.refresh());
}

export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}

export function updateRefreshToken(userId, refresh_token) {
  if (typeof refresh_token !== "undefined") {
    return User.where({ id: userId }).save(
      { refresh_token: refresh_token },
      { patch: true }
    );
  } else {
    return User.where({ id: userId })
      .save({ refresh_token: null }, { patch: true })
      .then(() => {
        return { message: "user loged out" };
      });
  }
}
