import express from "express";
import { adminRoute } from "../middleware/auth.middleware.js";
import { getCmpnys, getStds, regCompany, regStudent } from "../controller/admin.ctrl.js";
const router = express.Router()

router.post('/registerStd', adminRoute, regStudent)
router.get('/getStds', adminRoute, getStds)

router.post('/registerCmpny', adminRoute, regCompany)
router.get('/getCmpnys', adminRoute, getCmpnys)

export default router