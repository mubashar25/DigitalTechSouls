import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";

import adminMiddleware from "../../middleware/adminMiddleware.js";

import getUsersController from "../../controllers/admin/users/getUsersController.js";

import getSingleUserController from "../../controllers/admin/users/getSingleUserController.js";

import updateUserRoleController from "../../controllers/admin/users/updateUserRoleController.js";

import blockUserController from "../../controllers/admin/users/blockUserController.js";

import deleteUserController from "../../controllers/admin/users/deleteUserController.js";

const router = express.Router();

router.use(
  authMiddleware,
  adminMiddleware
);

router.get(
  "/",
  getUsersController
);

router.get(
  "/:id",
  getSingleUserController
);

router.put(
  "/role/:id",
  updateUserRoleController
);

router.put(
  "/block/:id",
  blockUserController
);

router.delete(
  "/:id",
  deleteUserController
);

export default router;