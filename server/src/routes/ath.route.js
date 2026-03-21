import express from "express";
import { test } from "../controller/ath.ctrl.js";
const router = express.Router()

router.get('/test', test )

export default router