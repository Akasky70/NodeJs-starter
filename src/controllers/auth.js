import { Router } from "express";
import HttpStatus from "http-status-codes";
import * as authServices from "../services/authServices";

const router = Router();

router.post("/login", (req, res, next) => {
  authServices
    .loginUser(req.body)
    .then(data =>
      res.json({
        data: data
      })
    )
    .catch(err => {
      res.status(err.status).json({ statusMessage: err.statusMessage });
    });
});

router.post("/refresh", (req, res, next) => {
  authServices
    .authenticateRefreshToken(req.body)
    .then(data => {
      res.json({
        data: data
      });
    })
    .catch(err => next(err));
});

router.get("/logout", (req, res, next) => {
  authServices
    .logoutUser(req.headers)
    .then(data =>
      res.json({
        status: "You are logged out",
        data: data
      })
    )
    .catch(err => next(err));
});

export default router;
