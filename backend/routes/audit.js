import Router from "express";
import AuthMiddleware from "../middleware/authMiddleware.js";
const router = Router();
import { fetchAudit, editAuditInfo } from "../controller/audit.js";
import ApiRateLimiter from "../middleware/limit.js";
router.get("/fetchAudit", fetchAudit);
router.post("/editAudit/:id", ApiRateLimiter, AuthMiddleware, editAuditInfo);
export default router;
