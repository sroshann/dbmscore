import express from "express";
import { login, logout, test } from "../controller/ath.ctrl.js";
const router = express.Router()

router.get('/test', test )
router.post('/login', login)
router.get('/logout', logout)

export default router