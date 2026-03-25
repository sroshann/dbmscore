import express from "express";
import { getUserData, login, logout } from "../controller/ath.ctrl.js";
const router = express.Router()

router.post('/login', login)
router.get('/logout', logout)
router.get('/getUserData', getUserData)

export default router