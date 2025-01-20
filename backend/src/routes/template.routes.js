import { Router } from "express";
import templateController from "../controllers/template.controller.js";


const router = Router();
router.route("/template").post(templateController)

export default router;