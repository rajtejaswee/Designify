import { Router } from "express";
import chatController from "../controllers/chat.controller.js";

const router = Router();
router.route("/chat").post(chatController);

export default router;
