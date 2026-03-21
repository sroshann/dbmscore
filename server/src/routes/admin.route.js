import express from "express";
import { adminRoute } from "../middleware/auth.middleware.js";
import { regStudent } from "../controller/admin.ctrl.js";
const router = express.Router()

router.post('/registerStd', adminRoute, regStudent)

export default router