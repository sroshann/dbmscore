import express from "express";
import { getAdmin, getCmpnys, getStds, regCompany, regStudent } from "../controller/admin.ctrl.js";
import { adminRoute } from "../middleware/middleware.js";
const router = express.Router()

router.post('/registerStd', adminRoute, regStudent)
router.get('/getStds', adminRoute, getStds)

router.post('/registerCmpny', adminRoute, regCompany)
router.get('/getCmpnys', adminRoute, getCmpnys)

router.get('/getAdmin', getAdmin)

export default router