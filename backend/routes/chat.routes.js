import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  accessChats,
  addToGroup,
  createGroup,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.route("/").post(protect, accessChats);
router.route("/").get(protect, fetchChats);
router.route("/creategroup").post(protect, createGroup);
router.route("/renamegroup").put(protect, renameGroup);
router.route("/removegroup").put(protect, removeFromGroup);
router.route("/addgroup").put(protect, addToGroup);

export default router;
