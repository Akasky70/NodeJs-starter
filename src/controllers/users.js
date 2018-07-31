import { Router } from "express";
import HttpStatus from "http-status-codes";
import * as userService from "../services/userService";
import { findUser, userValidator } from "../validators/userValidator";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.get("/", authenticate, (req, res, next) => {
  userService
    .getAllUsers()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.get("/:id", authenticate, (req, res, next) => {
  userService
    .getUser(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.post("/", userValidator, (req, res, next) => {
  userService
    .createUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

router.put("/:id", authenticate, findUser, userValidator, (req, res, next) => {
  userService
    .updateUser(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.delete("/:id", authenticate, findUser, (req, res, next) => {
  userService
    .deleteUser(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
