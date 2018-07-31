import { Router } from "express";
import HttpStatus from "http-status-codes";
import { authenticate } from "../middlewares/auth";
import { findTodo } from "../validators/todoValidator";
import * as todoServices from "../services/todoService";

const router = Router();
/**
 * GET /api/todos
 */
router.get("/", authenticate, (req, res, next) => {
  todoServices
    .getTodos(req.query, req.headers)
    .then(todos => {
      res.json({ data: todos });
    })
    .catch(err => {
      res.status(err.status).json({ statusMessage: err.statusMessage });
    });
});

/**
 * GET /api/todo/:id
 */
router.get("/:id", (req, res, next) => {
  todoServices
    .getTodo(req.params.id)
    .then(data => {
      res.json({ data: data });
    })
    .catch(() => {
      res.status(500).json({ message: "this is 500 error message" });
    });
});

/**
 * POST /api/todo
 */
router.post("/", authenticate, (req, res, next) => {
  todoServices
    .createTodo(req.body)
    .then(data => {
      res.json({ data: data });
    })
    .catch(() => {
      res.status(500).json({ message: "this is 500 error message" });
    });
});

/**
 * PUT /api/todo/:id
 */
router.put("/:id", authenticate, findTodo, (req, res, next) => {
  todoServices
    .updateTodo(req.params.id, req.body)
    .then(data => {
      res.json({ data: data });
    })
    .catch(() => {
      res.status(500).json({ message: "this is 500 error message" });
    });
});

/**
 * DELETE /api/users/:id
 */
router.delete("/:id", authenticate, findTodo, (req, res, next) => {
  todoServices
    .deleteTodo(req.params.id)
    .then(data => {
      res.json({ data: data });
    })
    .catch(() => {
      res.status(500).json({ message: "this is 500 error message" });
    });
});

export default router;
